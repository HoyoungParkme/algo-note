/**
 * 모듈명: mdx/sections
 * 파일 경로: src/components/mdx/sections.tsx
 * 목적: 토픽 본문의 3개 서브 섹션(Why/How/Template)을 표시 + 탭 컨테이너 역할
 *
 * 사용 패턴 (MDX):
 *   <Why> ... </Why>
 *   <How> ... </How>
 *   <Template> ... </Template>
 *
 * SubTabs 컴포넌트가 활성 탭에 따라 표시 여부를 제어한다.
 * 단순화를 위해 각 섹션은 data-section 속성을 달고, SubTabs가 부모에서 토글한다.
 */

import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

export function Why({ children }: SectionProps) {
  return (
    <div
      data-section="why"
      className="rounded-xl border px-4 py-4 my-1"
      style={{
        background: 'rgb(167 139 250 / 0.05)',
        borderColor: 'rgb(167 139 250 / 0.18)',
      }}
    >
      <div className="text-[0.75rem] font-bold uppercase tracking-widest mb-2.5 text-violet-400">
        왜 쓰는가
      </div>
      <div className="prose-mdx">{children}</div>
    </div>
  );
}

export function How({ children }: SectionProps) {
  return (
    <div
      data-section="how"
      className="rounded-xl border px-4 py-4 my-1"
      style={{
        background: 'rgb(52 211 153 / 0.05)',
        borderColor: 'rgb(52 211 153 / 0.18)',
      }}
    >
      <div className="text-[0.75rem] font-bold uppercase tracking-widest mb-2.5 text-emerald-400">
        어떻게 쓰는가
      </div>
      <div className="prose-mdx">{children}</div>
    </div>
  );
}

export function Template({ children }: SectionProps) {
  return (
    <div
      data-section="tpl"
      className="rounded-xl border px-4 py-4 my-1"
      style={{
        background: 'rgb(244 114 182 / 0.05)',
        borderColor: 'rgb(244 114 182 / 0.18)',
      }}
    >
      <div className="text-[0.75rem] font-bold uppercase tracking-widest mb-2.5 text-pink-400">
        코테 템플릿
      </div>
      <div className="prose-mdx">{children}</div>
    </div>
  );
}
