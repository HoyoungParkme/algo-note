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
import { ProblemCard } from '@/components/topic/ProblemCard';
import { SolutionModal } from '@/components/topic/SolutionModal';
import { PatternGrid } from '@/components/cheatsheet/PatternGrid';
import { PROBLEMS } from '@/content/problems';
import { useStore } from '@/store/useStore';
import type { Filters } from '@/store/useStore';
import { useShortcut } from '@/hooks/useShortcut';
import type { Topic } from '@/lib/types';

// ─── 푼 문제 탭용 상수 ───────────────────────────────────────────
/** problems.ts에 등장하는 고유 카테고리 목록 (순서 유지) */
const ALL_CATEGORIES = ['전체', ...Array.from(new Set(PROBLEMS.map((p) => p.category)))];

/** difficulty 문자열에서 티어명 추출 ("Gold III" → "Gold") */
function tierOf(difficulty: string): string {
  return difficulty.split(' ')[0];
}

/** 고유 티어 목록 (Bronze → Silver → Gold → Platinum 순) */
const TIER_ORDER = ['Bronze', 'Silver', 'Gold', 'Platinum'];
const ALL_TIERS = ['전체', ...TIER_ORDER.filter((t) =>
  PROBLEMS.some((p) => tierOf(p.difficulty) === t)
)];

/** 난이도 티어별 배지 색상 */
const TIER_STYLE: Record<string, { bg: string; text: string }> = {
  Bronze:   { bg: 'rgba(180,115,60,0.15)',  text: '#b47340' },
  Silver:   { bg: 'rgba(140,150,175,0.18)', text: '#8c96af' },
  Gold:     { bg: 'rgba(220,170,30,0.18)',  text: '#c8a020' },
  Platinum: { bg: 'rgba(0,190,170,0.15)',   text: '#00beaa' },
};

// 빌드 타임 import 결과만 사용하는 순수 함수이므로 모듈 평가 시점에 한 번만 호출
const algoTopics = loadAlgorithms();
const skillTopics = loadSkills();

/**
 * 필터 적용된 토픽 목록을 반환한다.
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

  // ─── 푼 문제 탭 로컬 필터 상태 ──────────────────────────────────
  const [selCategory, setSelCategory] = useState('전체');
  const [selTier, setSelTier] = useState('전체');

  /** 선택한 카테고리 + 티어로 문제 목록 필터링 */
  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((p) => {
      if (selCategory !== '전체' && p.category !== selCategory) return false;
      if (selTier !== '전체' && tierOf(p.difficulty) !== selTier) return false;
      return true;
    });
  }, [selCategory, selTier]);

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
            skillTopics={[]}
            onSearchClick={() => setSearchOpen(true)}
            onItemClick={() => setDrawerOpen(false)}
          />
        </MobileDrawer>

        <div className="flex-1 min-w-0 flex flex-col">
          <Header />
          <main
            className={`w-full mx-auto px-5 py-8 ${
              activeTab === 'algo' ? 'max-w-3xl' : 'max-w-4xl'
            }`}
          >
            {activeTab === 'algo' ? (
              <>
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
                <PatternGrid />
              </>
            ) : (
              /* ── 푼 문제 탭 ── */
              <div className="flex flex-col gap-4">

                {/* ── 필터 바 ── */}
                <div
                  className="rounded-2xl px-5 py-4 flex flex-col gap-4 sticky top-0 z-10"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 2px 12px rgba(0,0,0,.14)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* 카테고리 필터 */}
                  <div>
                    <p
                      className="text-[0.68rem] font-bold tracking-widest uppercase mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      알고리즘 분류
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_CATEGORIES.map((cat) => {
                        const active = selCategory === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelCategory(cat)}
                            className="px-3 py-1 rounded-lg text-[0.78rem] transition-all cursor-pointer"
                            style={{
                              background: active ? 'var(--accent)' : 'var(--bg)',
                              color: active ? '#fff' : 'var(--text-muted)',
                              border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                              fontWeight: active ? 700 : 400,
                            }}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 난이도(티어) 필터 + 결과 카운트 */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className="text-[0.68rem] font-bold tracking-widest uppercase shrink-0"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        난이도
                      </p>
                      <div className="flex gap-1.5 flex-wrap">
                        {ALL_TIERS.map((tier) => {
                          const active = selTier === tier;
                          const style = tier !== '전체' ? TIER_STYLE[tier] : null;
                          return (
                            <button
                              key={tier}
                              onClick={() => setSelTier(tier)}
                              className="px-3 py-1 rounded-lg text-[0.78rem] transition-all cursor-pointer"
                              style={{
                                background: active
                                  ? (style?.bg ?? 'rgba(167,139,250,0.2)')
                                  : 'var(--bg)',
                                color: active
                                  ? (style?.text ?? 'var(--accent)')
                                  : 'var(--text-muted)',
                                border: `1px solid ${
                                  active
                                    ? (style?.text ?? 'var(--accent)')
                                    : 'var(--border)'
                                }`,
                                fontWeight: active ? 700 : 400,
                              }}
                            >
                              {tier}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[0.78rem]" style={{ color: 'var(--text-muted)' }}>
                        <span className="font-bold" style={{ color: 'var(--text)' }}>
                          {filteredProblems.length}
                        </span>
                        /{PROBLEMS.length}개
                      </span>
                      {(selCategory !== '전체' || selTier !== '전체') && (
                        <button
                          onClick={() => {
                            setSelCategory('전체');
                            setSelTier('전체');
                          }}
                          className="text-[0.72rem] px-2 py-0.5 rounded cursor-pointer transition-all"
                          style={{
                            color: 'var(--accent)',
                            background: 'rgba(167,139,250,0.1)',
                            border: '1px solid rgba(167,139,250,0.3)',
                          }}
                        >
                          초기화
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── 문제 카드 목록 ── */}
                {filteredProblems.length === 0 ? (
                  <p
                    className="text-center py-16 text-[0.92rem]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    해당 조건에 맞는 문제가 없습니다.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {filteredProblems.map((p, i) => (
                      <ProblemCard
                        key={p.id}
                        problem={p}
                        defaultOpen={i === 0 && filteredProblems.length === 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

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
                : `${PROBLEMS.length}개 문제 풀이`}
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
