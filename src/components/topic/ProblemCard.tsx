/**
 * 모듈명: ProblemCard
 * 파일 경로: src/components/topic/ProblemCard.tsx
 * 목적: "푼 문제" 탭에서 개별 문제를 아코디언 카드로 표시
 *       펼치면 public/problems/ 안의 standalone HTML을 iframe으로 로드
 */

import { useState } from 'react';
import type { Problem } from '@/content/problems';

interface Props {
  problem: Problem;
  defaultOpen?: boolean;
}

/** vite.config.ts의 base 경로를 가져온다 (빌드/dev 모두 동작) */
const BASE = import.meta.env.BASE_URL;

export function ProblemCard({ problem, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section
      id={`sec-${problem.id}`}
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,.08)',
      }}
    >
      {/* 헤더 */}
      <header
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-3 px-6 py-5 cursor-pointer select-none hover:brightness-110"
      >
        <span
          className="font-mono text-[0.75rem] font-bold tracking-widest px-2.5 py-1 rounded-md shrink-0"
          style={{
            color: 'var(--accent)',
            background: 'rgb(167 139 250 / 0.10)',
          }}
        >
          {problem.num}
        </span>
        <div className="flex-1 min-w-0">
          <h2
            className="text-[1.05rem] font-bold -tracking-wide truncate"
            style={{ color: 'var(--text)' }}
          >
            {problem.title}
          </h2>
          <div
            className="text-[0.78rem] mt-0.5 flex items-center gap-2"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>{problem.category}</span>
            <span>·</span>
            <span>{problem.difficulty}</span>
          </div>
        </div>
        <span
          className="text-xl transition-transform shrink-0"
          style={{
            color: 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
          }}
        >
          ▾
        </span>
      </header>

      {/* 본문: iframe 시각화 */}
      {open && (
        <div className="px-4 pb-4">
          <div
            className="flex items-center gap-3 mb-3 text-[0.82rem]"
            style={{ color: 'var(--text-dim)' }}
          >
            <span>{problem.description}</span>
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline shrink-0"
              style={{ color: 'var(--accent)' }}
            >
              BOJ에서 보기
            </a>
          </div>
          <iframe
            src={`${BASE}${problem.htmlFile}`}
            title={`${problem.title} 시각화 풀이`}
            className="w-full rounded-xl border-0"
            style={{
              height: '85vh',
              minHeight: '700px',
              background: '#fff',
            }}
          />
        </div>
      )}
    </section>
  );
}
