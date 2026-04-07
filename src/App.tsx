/**
 * 모듈명: App
 * 파일 경로: src/App.tsx
 * 목적: 최상위 컴포넌트.
 *       - 알고리즘/스킬 토픽을 빌드 타임에 로드
 *       - 좌측 Sidebar(데스크톱) + MobileDrawer(모바일) + 메인 영역(Header + 카드 리스트) 레이아웃
 *       - theme 상태를 <html> 클래스에 동기화
 *       - Cmd+K 검색 팔레트 트리거
 *       - 활성 탭에 따라 알고리즘 카드 또는 스킬 카드 + 패턴 매핑 표시
 */

import { useEffect, useMemo, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { loadAlgorithms, loadSkills } from '@/lib/content-loader';
import { buildSearchIndex } from '@/lib/search';
import { mdxComponents } from '@/components/mdx';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { SearchPalette } from '@/components/layout/SearchPalette';
import { TopicCard } from '@/components/topic/TopicCard';
import { SolutionModal } from '@/components/topic/SolutionModal';
import { PatternGrid } from '@/components/cheatsheet/PatternGrid';
import { useStore } from '@/store/useStore';
import type { Filters } from '@/store/useStore';
import { useShortcut } from '@/hooks/useShortcut';
import type { Topic } from '@/lib/types';

// 빌드 타임 import 결과만 사용하는 순수 함수이므로 모듈 평가 시점에 한 번만 호출
const algoTopics = loadAlgorithms();
const skillTopics = loadSkills();

/**
 * 필터 적용된 토픽 목록을 반환한다.
 * 카테고리 필터(filters.category)는 Sprint 3에서 UI와 함께 추가 예정.
 */
function applyFilters(
  topics: Topic[],
  hidden: Record<string, boolean>,
  filters: Filters
): Topic[] {
  return topics.filter((t) => {
    if (!filters.showHidden && hidden[t.id]) return false;
    if (filters.difficulty !== 'all' && t.difficulty !== filters.difficulty)
      return false;
    if (filters.onlyUnlearned && !t.unlearned) return false;
    // TODO(Sprint 3): filters.category 필터 적용
    return true;
  });
}

export default function App() {
  const theme = useStore((s) => s.theme);
  const activeTab = useStore((s) => s.activeTab);
  const filters = useStore((s) => s.filters);
  const hidden = useStore((s) => s.hidden);
  const setDrawerOpen = useStore((s) => s.setDrawerOpen);

  const [searchOpen, setSearchOpen] = useState(false);

  // theme → <html> 클래스 동기화
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Cmd+K / Ctrl+K 단축키
  useShortcut({ key: 'k', meta: true }, () => setSearchOpen(true));

  // 검색 인덱스
  const fuse = useMemo(
    () => buildSearchIndex(algoTopics, skillTopics),
    []
  );

  // 활성 탭에 따른 토픽 선택 + 필터 적용
  const visibleTopics = useMemo(() => {
    const base = activeTab === 'algo' ? algoTopics : skillTopics;
    return applyFilters(base, hidden, filters);
  }, [activeTab, hidden, filters]);

  return (
    <MDXProvider components={mdxComponents}>
      <div className="flex min-h-screen">
        <MobileDrawer>
          <Sidebar
            algoTopics={algoTopics}
            skillTopics={skillTopics}
            onSearchClick={() => setSearchOpen(true)}
            onItemClick={() => setDrawerOpen(false)}
          />
        </MobileDrawer>

        <div className="flex-1 min-w-0 flex flex-col">
          <Header />
          <main className="max-w-3xl w-full mx-auto px-5 py-8">
            {visibleTopics.length === 0 ? (
              <p
                className="text-center py-16 text-[0.92rem]"
                style={{ color: 'var(--text-muted)' }}
              >
                필터 조건에 맞는 토픽이 없습니다.
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                {visibleTopics.map((t, i) => (
                  <div
                    key={t.id}
                    style={{
                      animationDelay: `${Math.min(i, 12) * 0.03}s`,
                    }}
                  >
                    <TopicCard topic={t} defaultOpen={i === 0} />
                  </div>
                ))}
              </div>
            )}

            {/* 알고리즘 탭에서만 패턴 매핑 표시 */}
            {activeTab === 'algo' && <PatternGrid />}

            <footer
              className="text-center pt-12 mt-12 text-[0.82rem]"
              style={{
                color: 'var(--text-muted)',
                borderTop: '1px solid var(--border)',
              }}
            >
              호영의 알고리즘 스터디 노트 ·{' '}
              {activeTab === 'algo'
                ? `${algoTopics.length}개 알고리즘`
                : `${skillTopics.length}개 실전 스킬`}
            </footer>
          </main>
        </div>
      </div>

      <SearchPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        fuse={fuse}
      />
      <SolutionModal />
    </MDXProvider>
  );
}
