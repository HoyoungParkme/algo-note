/**
 * 모듈명: Header
 * 파일 경로: src/components/layout/Header.tsx
 * 목적: 메인 영역 상단 헤더 (모바일 햄버거 + 페이지 타이틀 + 다크 토글)
 *       (진행률은 사이드바로 이동했음)
 */

import { useStore } from '@/store/useStore';

export function Header() {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const setDrawerOpen = useStore((s) => s.setDrawerOpen);
  const activeTab = useStore((s) => s.activeTab);

  const subtitle =
    activeTab === 'algo'
      ? '코딩 테스트 완전 정복 · 알고리즘 25개'
      : '문제 풀이 사고력 + 구현력 · 실전 스킬 5개';

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-3 px-5 py-3.5 backdrop-blur border-b"
      style={{
        background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      {/* 모바일 햄버거 */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--text-dim)',
        }}
        aria-label="사이드바 열기"
      >
        <span aria-hidden="true">☰</span>
      </button>

      <div className="flex-1 min-w-0">
        <p
          className="text-[0.78rem] font-medium truncate"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </p>
      </div>

      {/* 다크 모드 토글 */}
      <button
        type="button"
        onClick={toggleTheme}
        className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all hover:brightness-110"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--text-dim)',
        }}
        aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
        title={theme === 'dark' ? '라이트 모드로' : '다크 모드로'}
      >
        <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      </button>
    </header>
  );
}
