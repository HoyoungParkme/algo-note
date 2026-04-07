/**
 * 모듈명: FilterBar
 * 파일 경로: src/components/layout/FilterBar.tsx
 * 목적: 사이드바 하단 필터 바 (난이도, 숨김 표시 토글, 예습만, 리셋)
 */

import { useStore } from '@/store/useStore';
import type { Difficulty } from '@/store/useStore';

const DIFFICULTIES: { key: Difficulty; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'easy', label: '쉬움' },
  { key: 'medium', label: '중간' },
  { key: 'hard', label: '어려움' },
];

export function FilterBar() {
  const filters = useStore((s) => s.filters);
  const setFilter = useStore((s) => s.setFilter);
  const resetFilters = useStore((s) => s.resetFilters);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="text-[0.7rem] font-bold uppercase tracking-widest"
        style={{ color: 'var(--text-muted)' }}
      >
        필터
      </div>
      {/* TODO(Sprint 3): 카테고리 필터 셀렉트 추가 (filters.category) */}

      {/* 난이도 */}
      <div className="flex gap-1">
        {DIFFICULTIES.map((d) => {
          const isActive = filters.difficulty === d.key;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => setFilter({ difficulty: d.key })}
              className="flex-1 px-1 py-1 text-[0.72rem] font-medium rounded-md transition-all"
              style={{
                background: isActive ? 'var(--accent)' : 'var(--card)',
                color: isActive ? '#fff' : 'var(--text-dim)',
                border: '1px solid var(--border)',
              }}
              aria-pressed={isActive}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      {/* 토글: 숨김 표시 */}
      <label
        className="flex items-center gap-2 text-[0.78rem] cursor-pointer"
        style={{ color: 'var(--text-dim)' }}
      >
        <input
          type="checkbox"
          checked={filters.showHidden}
          onChange={(e) => setFilter({ showHidden: e.target.checked })}
          className="accent-violet-500"
        />
        숨긴 토픽 표시
      </label>

      {/* 토글: 예습만 */}
      <label
        className="flex items-center gap-2 text-[0.78rem] cursor-pointer"
        style={{ color: 'var(--text-dim)' }}
      >
        <input
          type="checkbox"
          checked={filters.onlyUnlearned}
          onChange={(e) => setFilter({ onlyUnlearned: e.target.checked })}
          className="accent-violet-500"
        />
        예습 토픽만 보기
      </label>

      <button
        type="button"
        onClick={resetFilters}
        className="text-[0.72rem] underline self-start"
        style={{ color: 'var(--text-muted)' }}
      >
        필터 초기화
      </button>
    </div>
  );
}
