/**
 * 모듈명: MobileDrawer
 * 파일 경로: src/components/layout/MobileDrawer.tsx
 * 목적: 사이드바를 데스크톱에서는 좌측 sticky로, 모바일에서는 슬라이드 인 드로어로 표시
 *       children을 단일 인스턴스로 마운트하여 IntersectionObserver/getElementById 충돌 방지
 *       (W-3 수정)
 */

import { useEffect, type ReactNode } from 'react';
import { useStore } from '@/store/useStore';

interface Props {
  children: ReactNode;
}

export function MobileDrawer({ children }: Props) {
  const drawerOpen = useStore((s) => s.drawerOpen);
  const setDrawerOpen = useStore((s) => s.setDrawerOpen);

  // 드로어가 열려있을 때만 ESC 키 리스너 등록
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, setDrawerOpen]);

  return (
    <>
      {/* 모바일 오버레이 (드로어 열렸을 때만) */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
        />
      )}

      {/*
        단일 컨테이너:
        - 모바일(<md): fixed + transform translate
        - 데스크톱(md+): static + sticky top-0 + h-screen
      */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 md:z-auto
          h-screen w-72 md:w-64 shrink-0
          transform transition-transform duration-300
          md:translate-x-0
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {children}
      </aside>
    </>
  );
}
