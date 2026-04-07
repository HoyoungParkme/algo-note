/**
 * 모듈명: Sidebar
 * 파일 경로: src/components/layout/Sidebar.tsx
 * 목적: 좌측 고정 사이드바. 탭/네비/필터/검색 트리거를 수직 배치
 *       데스크톱에서는 항상 표시, 모바일에서는 MobileDrawer가 wrap
 */

import type { Topic } from '@/lib/types';
import { useStore } from '@/store/useStore';
import { TopTabs } from './TopTabs';
import { NavList } from './NavList';
import { FilterBar } from './FilterBar';

interface Props {
  algoTopics: Topic[];
  skillTopics: Topic[];
  onSearchClick: () => void;
  onItemClick?: () => void;
}

export function Sidebar({
  algoTopics,
  skillTopics,
  onSearchClick,
  onItemClick,
}: Props) {
  const activeTab = useStore((s) => s.activeTab);
  const topics = activeTab === 'algo' ? algoTopics : skillTopics;

  const mastered = useStore((s) => s.mastered);
  const total = topics.length;
  const done = topics.filter((t) => mastered[t.id]).length;
  const pct = total === 0 ? 0 : (done / total) * 100;

  return (
    <aside
      className="flex flex-col h-full w-full"
      style={{
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* 헤더: 로고 + 탭 + 검색 트리거 */}
      <div
        className="px-4 py-4 border-b shrink-0"
        style={{ borderColor: 'var(--border)' }}
      >
        <h1
          className="font-display font-black text-[1.25rem] mb-3 leading-none"
          style={{
            background:
              'linear-gradient(135deg, var(--text) 0%, var(--accent) 50%, var(--accent2) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Algorithm Study
        </h1>
        <TopTabs />

        {/* 검색 트리거 */}
        <button
          type="button"
          onClick={onSearchClick}
          className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[0.82rem] transition-all hover:brightness-110"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <span aria-hidden="true">🔍</span>
          <span className="flex-1 text-left">검색…</span>
          <kbd
            className="text-[0.7rem] px-1.5 py-0.5 rounded font-mono"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-dim)',
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* 진행률 */}
        <div className="mt-3 flex items-center gap-2">
          <div
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{ background: 'var(--border)' }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background:
                  'linear-gradient(90deg, var(--accent), var(--accent2))',
              }}
            />
          </div>
          <span
            className="text-[0.72rem] font-mono shrink-0"
            style={{ color: 'var(--text-dim)' }}
          >
            {done}/{total}
          </span>
        </div>
      </div>

      {/* 토픽 네비 (스크롤) */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <NavList topics={topics} onItemClick={onItemClick} />
      </nav>

      {/* 필터 (하단 고정) */}
      <div
        className="px-3 py-3 border-t shrink-0"
        style={{ borderColor: 'var(--border)' }}
      >
        <FilterBar />
      </div>
    </aside>
  );
}
