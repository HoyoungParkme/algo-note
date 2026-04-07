/**
 * 모듈명: Quiz
 * 파일 경로: src/components/topic/Quiz.tsx
 * 목적: 토픽별 4지선다 퀴즈 렌더링 + 정답 체크
 */

import { useState } from 'react';
import type { Quiz as QuizData } from '@/lib/types';

interface Props {
  quiz: QuizData;
}

export function Quiz({ quiz }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div
      className="mt-5 rounded-xl border p-5"
      style={{
        background: 'var(--code-bg)',
        borderColor: 'var(--border)',
      }}
    >
      <div
        className="text-[0.92rem] font-semibold mb-3.5"
        style={{ color: 'var(--text)' }}
      >
        {quiz.q}
      </div>
      <div className="flex flex-col gap-2">
        {quiz.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = selected !== null && i === quiz.answer;
          const isWrong = isSelected && i !== quiz.answer;
          let bg = 'var(--card)';
          let border = 'var(--border)';
          let color = 'var(--text-dim)';
          if (isCorrect) {
            bg = 'rgb(34 197 94 / 0.10)';
            border = '#22c55e';
            color = '#22c55e';
          } else if (isWrong) {
            bg = 'rgb(239 68 68 / 0.10)';
            border = '#ef4444';
            color = '#ef4444';
          }
          return (
            <button
              key={opt}
              type="button"
              disabled={selected !== null}
              onClick={() => setSelected(i)}
              className="px-4 py-2.5 rounded-lg border text-left text-[0.88rem] transition-all disabled:cursor-default"
              style={{ background: bg, borderColor: border, color }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div
          className="mt-3 p-3 rounded-lg border text-[0.85rem]"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--text-dim)',
          }}
        >
          {quiz.explain}
        </div>
      )}
    </div>
  );
}
