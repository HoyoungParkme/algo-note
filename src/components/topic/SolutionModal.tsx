/**
 * 모듈명: SolutionModal
 * 파일 경로: src/components/topic/SolutionModal.tsx
 * 목적: 풀이(Solution) MDX를 모달로 표시
 *       store.solutionModal.open 상태와 연동되어 백드롭 + 중앙 카드 + 헤더 메타 + 본문 렌더링
 *       ESC, ✕ 버튼, 백드롭 클릭으로 닫힘
 */

import { useEffect, useMemo } from 'react';
import { loadSolutions } from '@/lib/content-loader';
import { useStore } from '@/store/useStore';

// 빌드 타임에 한 번 로드
const solutions = loadSolutions();

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: '쉬움',
  medium: '중간',
  hard: '어려움',
};

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: '#34d399',
  medium: '#fbbf24',
  hard: '#f87171',
};

export function SolutionModal() {
  const open = useStore((s) => s.solutionModal.open);
  const problemId = useStore((s) => s.solutionModal.problemId);
  const closeSolution = useStore((s) => s.closeSolution);

  const solution = useMemo(
    () => (problemId ? solutions[problemId] : null),
    [problemId]
  );

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSolution();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeSolution]);

  // body 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open || !problemId) return null;

  if (!solution) {
    return (
      <div
        onClick={closeSolution}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
        aria-label="풀이 데이터 없음"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="rounded-2xl p-6 max-w-md w-full"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
        >
          <p className="text-[0.92rem]">
            풀이 데이터를 찾을 수 없습니다: <code>{problemId}</code>
          </p>
          <button
            type="button"
            onClick={closeSolution}
            className="mt-4 px-4 py-2 rounded-lg"
            style={{
              background: 'var(--accent)',
              color: '#fff',
            }}
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  const Body = solution.Component;

  return (
    <div
      onClick={closeSolution}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[6vh] pb-[6vh] px-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`${solution.title} 풀이`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-2xl shadow-2xl"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
        }}
      >
        {/* 헤더 */}
        <div
          className="sticky top-0 z-10 flex items-start gap-3 px-6 py-4 border-b backdrop-blur"
          style={{
            background: 'color-mix(in srgb, var(--card) 95%, transparent)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex-1 min-w-0">
            <h2
              className="text-[1.25rem] font-bold leading-tight"
              style={{ color: 'var(--text)' }}
            >
              {solution.title}
            </h2>
            <div
              className="mt-1 flex items-center gap-2 flex-wrap text-[0.78rem]"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="font-mono">BOJ {solution.problemNumber}</span>
              <span>·</span>
              <span
                style={{ color: DIFFICULTY_COLOR[solution.difficulty] }}
              >
                {DIFFICULTY_LABEL[solution.difficulty] ?? solution.difficulty}
              </span>
              <span>·</span>
              <span className="font-mono">시간 {solution.timeComplexity}</span>
              <span>·</span>
              <span className="font-mono">공간 {solution.spaceComplexity}</span>
            </div>
            <a
              href={solution.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-[0.82rem] underline"
              style={{ color: 'var(--accent)' }}
            >
              🔗 BOJ에서 문제 보기
            </a>
          </div>
          <button
            type="button"
            onClick={closeSolution}
            className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg shrink-0"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text-dim)',
            }}
            aria-label="모달 닫기"
          >
            ✕
          </button>
        </div>

        {/* 본문 */}
        <div className="px-6 py-5 prose-mdx">
          <Body />
        </div>

        {/* 푸터 */}
        <div
          className="px-6 py-3 border-t flex items-center justify-end gap-2 text-[0.78rem]"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <kbd
            className="px-1.5 py-0.5 rounded font-mono"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            ESC
          </kbd>
          로 닫기
        </div>
      </div>
    </div>
  );
}
