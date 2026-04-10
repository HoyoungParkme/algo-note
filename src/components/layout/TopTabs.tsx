/**
 * 모듈명: TopTabs
 * 파일 경로: src/components/layout/TopTabs.tsx
 * 목적: 사이드바 상단의 알고리즘/스킬 탭 전환
 */

import { useStore } from '@/store/useStore';
import type { Tab } from '@/store/useStore';

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: 'algo', label: '알고리즘', emoji: '📚' },
  { key: 'skill', label: '푼 문제', emoji: '📝' },
];

export function TopTabs() {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);

  return (
    <div
      className="flex gap-1 p-1.5 rounded-xl"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {TABS.map((t) => {
        const isActive = activeTab === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key)}
            className="flex-1 px-3 py-2 rounded-lg text-[0.85rem] font-bold transition-all"
            style={{
              background: isActive ? 'var(--card)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,.15)' : 'none',
            }}
            aria-pressed={isActive}
          >
            <span className="mr-1.5" aria-hidden="true">{t.emoji}</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
