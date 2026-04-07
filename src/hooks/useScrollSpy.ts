/**
 * 모듈명: useScrollSpy
 * 파일 경로: src/hooks/useScrollSpy.ts
 * 목적: 화면에 보이는 섹션 ID를 추적해 사이드 네비 active 상태와 동기화
 * 주요 의존성: React (IntersectionObserver)
 */

import { useEffect, useState } from 'react';

/**
 * 주어진 ID 목록 중 현재 viewport에 들어온 첫 번째 ID를 반환한다.
 *
 * Args:
 *   ids: 관찰할 섹션 element id 배열
 *   rootMargin: IntersectionObserver rootMargin
 *
 * Returns:
 *   string | null: 현재 활성 섹션 id
 */
export function useScrollSpy(
  ids: string[],
  rootMargin = '-30% 0px -60% 0px'
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin, threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(`sec-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
