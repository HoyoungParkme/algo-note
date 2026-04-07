/**
 * 모듈명: SubTabs
 * 파일 경로: src/components/topic/SubTabs.tsx
 * 목적: TopicCard 안에서 "왜/어떻게/템플릿" 탭을 전환
 *       MDX가 렌더한 자식 중 data-section 속성으로 필터링
 */

import { useState, type ReactNode } from 'react';

type TabKey = 'why' | 'how' | 'tpl';

const TABS: { key: TabKey; label: string; color: string }[] = [
  { key: 'why', label: '왜 쓰는가', color: '#a78bfa' },
  { key: 'how', label: '어떻게 쓰는가', color: '#34d399' },
  { key: 'tpl', label: '코테 템플릿', color: '#f472b6' },
];

interface Props {
  children: ReactNode;
}

/**
 * MDX가 렌더한 본문 자식들 중 data-section 속성을 가진 div만
 * 활성 탭과 일치하는 것을 보여준다.
 */
export function SubTabs({ children }: Props) {
  const [active, setActive] = useState<TabKey>('why');

  return (
    <div>
      <div className="flex gap-1.5 mb-3.5 flex-wrap">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className="px-3.5 py-1.5 text-[0.8rem] font-semibold rounded-full border-[1.5px] transition-all"
              style={{
                background: isActive ? t.color : 'var(--bg)',
                borderColor: isActive ? t.color : 'var(--border)',
                color: isActive ? '#fff' : 'var(--text-muted)',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {/* 활성 탭만 보이도록 globals.css에서 .sub-tabs-content[data-active-tab=...] 규칙으로 제어 */}
      <div data-active-tab={active} className="sub-tabs-content">
        {children}
      </div>
    </div>
  );
}
