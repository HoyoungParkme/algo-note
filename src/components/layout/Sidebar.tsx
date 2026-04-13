/**
 * 모듈명: Sidebar
 * 파일 경로: src/components/layout/Sidebar.tsx
 * 목적: 좌측 고정 사이드바. 탭/네비/필터/검색 트리거를 수직 배치
 *       데스크톱에서는 항상 표시, 모바일에서는 MobileDrawer가 wrap
 *       알고리즘 탭: 토픽 NavList + 필터, 푼 문제 탭: 문제 리스트
 */

import { useState, useMemo } from 'react';
import type { Topic } from '@/lib/types';
import { PROBLEMS } from '@/content/problems';
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
  onSearchClick,
  onItemClick,
}: Props) {
  const activeTab = useStore((s) => s.activeTab);
  const mastered = useStore((s) => s.mastered);
  const selectedProblemId = useStore((s) => s.selectedProblemId);
  const setSelectedProblemId = useStore((s) => s.setSelectedProblemId);

  // 알고리즘 탭의 진행률
  const total = algoTopics.length;
  const done = algoTopics.filter((t) => mastered[t.id]).length;
  const pct = total === 0 ? 0 : (done / total) * 100;

  // 푼 문제 카테고리별 아코디언 상태
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});

  const problemsByCategory = useMemo(() => {
    const grouped: Record<string, typeof PROBLEMS> = {};
    PROBLEMS.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });
    return grouped;
  }, []);

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

        {/* 검색 트리거 (알고리즘 탭에서만 표시) */}
        {activeTab === 'algo' && (
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
        )}

        {/* 진행률 (알고리즘 탭에서만) */}
        {activeTab === 'algo' && (
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
        )}
      </div>

      {/* 네비게이션 (스크롤) */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {activeTab === 'algo' ? (
          <NavList topics={algoTopics} onItemClick={onItemClick} />
        ) : (
          /* 푼 문제 목록 (카테고리별 그룹) */
          <div className="flex flex-col gap-2">
            {Object.entries(problemsByCategory).map(([category, problems]) => {
              const isOpen = openCats[category] ?? false;
              return (
                <div key={category} className="flex flex-col">
                  {/* 카테고리 헤더 */}
                  <button
                    type="button"
                    onClick={() => setOpenCats(prev => ({ ...prev, [category]: !prev[category] }))}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-left text-[0.85rem] font-bold transition-all hover:bg-[rgba(167,139,250,0.1)]"
                    style={{ color: 'var(--text)' }}
                  >
                    <span>{category} <span className="text-[0.7rem] font-normal" style={{ color: 'var(--text-muted)' }}>({problems.length})</span></span>
                    <span
                      className="text-[0.7rem] transition-transform"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {/* 카테고리 내 문제 목록 */}
                  {isOpen && (
                    <ul className="flex flex-col gap-0.5 mt-1 ml-2 border-l pl-2" style={{ borderColor: 'var(--space-border)' }}>
                      {problems.map((p) => {
                        const isSelected = selectedProblemId === p.id;
                        return (
                          <li key={p.id}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedProblemId(p.id);
                                if (onItemClick) onItemClick();
                              }}
                              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-[0.8rem] font-medium transition-all hover:bg-[var(--card)]"
                              style={{ 
                                color: isSelected ? 'var(--accent)' : 'var(--text-dim)',
                                background: isSelected ? 'rgba(167,139,250,0.1)' : 'transparent',
                              }}
                            >
                              <span
                                className="font-mono text-[0.65rem] w-10 text-center shrink-0"
                                style={{ color: isSelected ? 'var(--accent)' : 'var(--text-muted)' }}
                              >
                                {p.num}
                              </span>
                              <span className="flex-1 truncate font-bold">{p.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>

      {/* 필터 (알고리즘 탭에서만) */}
      {activeTab === 'algo' && (
        <div
          className="px-3 py-3 border-t shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          <FilterBar />
        </div>
      )}
    </aside>
  );
}
