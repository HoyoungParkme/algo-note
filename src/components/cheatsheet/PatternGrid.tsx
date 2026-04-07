/**
 * 모듈명: PatternGrid
 * 파일 경로: src/components/cheatsheet/PatternGrid.tsx
 * 목적: 키워드 → 알고리즘 매핑 치트시트 그리드
 */

import { PATTERNS } from '@/content/patterns';

export function PatternGrid() {
  return (
    <section className="mt-10">
      <h2
        className="font-display text-[1.5rem] mb-4"
        style={{
          background:
            'linear-gradient(90deg, var(--text), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        패턴 요약 — 키워드 → 알고리즘
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PATTERNS.map((p) => (
          <div
            key={p.key}
            className="p-4 rounded-xl border transition-all hover:-translate-y-0.5"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div
              className="text-[0.78rem] font-semibold uppercase tracking-wide mb-1.5"
              style={{ color: 'var(--accent2)' }}
            >
              {p.key}
            </div>
            <div
              className="text-[0.88rem]"
              style={{ color: 'var(--text-dim)' }}
            >
              {p.val}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
