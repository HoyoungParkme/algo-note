/**
 * 모듈명: mdx/boxes
 * 파일 경로: src/components/mdx/boxes.tsx
 * 목적: MDX 본문 안에서 쓰는 안내 박스(Tip, Warn, Prob, Analogy) 컴포넌트
 */

import type { ReactNode } from 'react';

interface BoxProps {
  title?: string;
  children: ReactNode;
}

export function Tip({ title = '핵심 정리', children }: BoxProps) {
  return (
    <div
      className="my-3.5 rounded-xl border px-4 py-3.5"
      style={{
        background: 'rgb(34 197 94 / 0.06)',
        borderColor: 'rgb(34 197 94 / 0.25)',
      }}
    >
      <div className="text-[0.72rem] font-bold uppercase tracking-widest mb-1.5 text-emerald-500">
        {title}
      </div>
      <div className="text-[0.92rem]" style={{ color: 'var(--text-dim)' }}>
        {children}
      </div>
    </div>
  );
}

export function Warn({ title = '주의', children }: BoxProps) {
  return (
    <div
      className="my-3.5 rounded-xl border px-4 py-3.5"
      style={{
        background: 'rgb(202 138 4 / 0.06)',
        borderColor: 'rgb(202 138 4 / 0.28)',
      }}
    >
      <div className="text-[0.72rem] font-bold uppercase tracking-widest mb-1.5 text-yellow-500">
        {title}
      </div>
      <div className="text-[0.92rem]" style={{ color: 'var(--text-dim)' }}>
        {children}
      </div>
    </div>
  );
}

interface ProbProps {
  title?: string;
  tags: string[];
}

export function Prob({ title = '이런 문제에서 쓴다', tags }: ProbProps) {
  return (
    <div
      className="my-3.5 rounded-xl border px-4 py-3.5"
      style={{
        background: 'rgb(167 139 250 / 0.06)',
        borderColor: 'rgb(167 139 250 / 0.22)',
      }}
    >
      <div className="text-[0.72rem] font-bold uppercase tracking-widest mb-2 text-violet-400">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-[0.78rem] rounded-full border"
            style={{
              background: 'var(--bg)',
              borderColor: 'var(--border)',
              color: 'var(--text-dim)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

interface AnalogyProps {
  children: ReactNode;
}

/** MDX 본문 최상단에서 비유를 강조 */
export function Analogy({ children }: AnalogyProps) {
  return (
    <div
      className="mb-4 rounded-r-xl border-l-[3px] px-4 py-3.5 text-[0.95rem]"
      style={{
        background:
          'linear-gradient(135deg, rgb(167 139 250 / 0.08), rgb(244 114 182 / 0.06))',
        borderLeftColor: 'var(--accent)',
        color: 'var(--text-dim)',
      }}
    >
      <strong className="font-bold mr-2" style={{ color: 'var(--accent)' }}>
        비유
      </strong>
      — {children}
    </div>
  );
}
