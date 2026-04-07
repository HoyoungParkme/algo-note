/**
 * 모듈명: NavList
 * 파일 경로: src/components/layout/NavList.tsx
 * 목적: 사이드바 안의 토픽 목록 렌더링 (스크롤 스파이 + 클릭 스크롤)
 */

import { useMemo } from 'react';
import type { Topic } from '@/lib/types';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useStore } from '@/store/useStore';

interface Props {
  topics: Topic[];
  onItemClick?: () => void;
}

export function NavList({ topics, onItemClick }: Props) {
  const ids = useMemo(() => topics.map((t) => t.id), [topics]);
  const active = useScrollSpy(ids);
  const mastered = useStore((s) => s.mastered);
  const hidden = useStore((s) => s.hidden);

  return (
    <ul className="flex flex-col gap-0.5">
      {topics.map((t) => {
        const isActive = active === t.id;
        const isDone = Boolean(mastered[t.id]);
        const isHidden = Boolean(hidden[t.id]);
        return (
          <li key={t.id}>
            <button
              type="button"
              aria-label={t.title}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => {
                document
                  .getElementById(`sec-${t.id}`)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                onItemClick?.();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[0.85rem] font-medium transition-all"
              style={{
                color: isActive
                  ? 'var(--accent)'
                  : isHidden
                  ? 'var(--text-muted)'
                  : 'var(--text-dim)',
                background: isActive
                  ? 'rgb(167 139 250 / 0.12)'
                  : 'transparent',
                opacity: isHidden ? 0.5 : 1,
              }}
            >
              <span
                className="font-mono text-[0.7rem] w-7 text-center shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                {t.num}
              </span>
              <span className="flex-1 truncate">{t.title}</span>
              {isDone && (
                <span className="text-emerald-500 text-[0.75rem] shrink-0">✓</span>
              )}
              {t.unlearned && (
                <span
                  className="text-[0.65rem] px-1.5 py-0.5 rounded-full shrink-0"
                  style={{
                    background: 'rgb(249 115 22 / 0.15)',
                    color: '#f97316',
                  }}
                >
                  예습
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
