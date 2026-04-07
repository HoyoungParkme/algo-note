/**
 * 모듈명: useStore
 * 파일 경로: src/store/useStore.ts
 * 목적: 전역 상태(마스터 체크, 테마, 활성 탭, 숨김, 필터, 모바일 드로어)를 zustand로 관리
 *       localStorage에 영속화. drawerOpen은 ephemeral이라 영속화 제외.
 * 주요 기능:
 *   - mastered: { [topicId]: true } 학습 완료 상태
 *   - theme: 'light' | 'dark'
 *   - activeTab: 'algo' | 'skill'
 *   - hidden: { [topicId]: true } 숨김 토픽
 *   - filters: 난이도/카테고리/숨김 표시/예습만 보기
 *   - drawerOpen: 모바일 사이드바 드로어 (영속화 X)
 *   - 기존 'algo_mastered' 키에서 마이그레이션 1회 수행
 * 주요 의존성: zustand, zustand/middleware
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';
export type Tab = 'algo' | 'skill';
export type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

export interface Filters {
  difficulty: Difficulty;
  category: string; // 'all' or specific category id
  showHidden: boolean;
  onlyUnlearned: boolean;
}

interface AppState {
  mastered: Record<string, boolean>;
  theme: Theme;
  activeTab: Tab;
  hidden: Record<string, boolean>;
  filters: Filters;
  drawerOpen: boolean;
  /** 풀이 모달 상태 (영속화 X) */
  solutionModal: {
    open: boolean;
    problemId: string | null;
  };

  toggleMaster: (id: string) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setActiveTab: (tab: Tab) => void;
  toggleHidden: (id: string) => void;
  setFilter: (patch: Partial<Filters>) => void;
  resetFilters: () => void;
  setDrawerOpen: (open: boolean) => void;
  openSolution: (problemId: string) => void;
  closeSolution: () => void;
}

const DEFAULT_FILTERS: Filters = {
  difficulty: 'all',
  category: 'all',
  showHidden: false,
  onlyUnlearned: false,
};

/** 기존 note.html이 쓰던 localStorage 키에서 1회 마이그레이션 */
function migrateLegacyMastered(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const legacy = localStorage.getItem('algo_mastered');
    if (!legacy) return {};
    const parsed = JSON.parse(legacy);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {
    /* ignore */
  }
  return {};
}

/**
 * 액션은 순수하게 상태만 변경한다.
 * DOM 동기화(`<html class="dark">`)는 App.tsx의 useEffect에서 theme를 구독해 처리한다.
 */
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      mastered: migrateLegacyMastered(),
      theme: 'dark',
      activeTab: 'algo',
      hidden: {},
      filters: DEFAULT_FILTERS,
      drawerOpen: false,
      solutionModal: { open: false, problemId: null },

      toggleMaster: (id) =>
        set((s) => ({
          mastered: { ...s.mastered, [id]: !s.mastered[id] },
        })),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setActiveTab: (activeTab) => set({ activeTab }),
      toggleHidden: (id) =>
        set((s) => ({
          hidden: { ...s.hidden, [id]: !s.hidden[id] },
        })),
      setFilter: (patch) =>
        set((s) => ({ filters: { ...s.filters, ...patch } })),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),
      setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
      openSolution: (problemId) =>
        set({ solutionModal: { open: true, problemId } }),
      closeSolution: () =>
        set({ solutionModal: { open: false, problemId: null } }),
    }),
    {
      name: 'algo-note-store',
      partialize: (state) => ({
        mastered: state.mastered,
        theme: state.theme,
        activeTab: state.activeTab,
        hidden: state.hidden,
        filters: state.filters,
      }),
    }
  )
);
