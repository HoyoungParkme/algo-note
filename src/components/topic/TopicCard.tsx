/**
 * 모듈명: TopicCard
 * 파일 경로: src/components/topic/TopicCard.tsx
 * 목적: 토픽 1개를 아코디언 카드로 렌더링
 *       헤더(번호+제목+예습 배지) + 본문(Analogy + SubTabs[Why/How/Template] + Quiz + MasterButton)
 */

import { useState } from 'react';
import type { Topic } from '@/lib/types';
import { Analogy } from '@/components/mdx/boxes';
import { SubTabs } from './SubTabs';
import { Quiz } from './Quiz';
import { MasterButton } from './MasterButton';
import { useStore } from '@/store/useStore';

interface Props {
  topic: Topic;
  defaultOpen?: boolean;
}

export function TopicCard({ topic, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const mastered = useStore((s) => Boolean(s.mastered[topic.id]));
  const Body = topic.Component;

  const borderStyle = topic.unlearned
    ? '3px solid #f97316'
    : '1px solid var(--border)';

  return (
    <section
      id={`sec-${topic.id}`}
      className="rounded-2xl overflow-hidden transition-all opacity-0 animate-fadeUp"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderLeft: borderStyle,
        boxShadow: '0 1px 3px rgba(0,0,0,.08)',
      }}
    >
      <header
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-3 px-6 py-5 cursor-pointer select-none hover:brightness-110"
      >
        <span
          className="font-mono text-[0.75rem] font-bold tracking-widest px-2.5 py-1 rounded-md"
          style={{
            color: topic.unlearned ? '#f97316' : 'var(--accent)',
            background: topic.unlearned
              ? 'rgb(249 115 22 / 0.10)'
              : 'rgb(167 139 250 / 0.10)',
          }}
        >
          {topic.num}
        </span>
        <h2
          className="flex-1 text-[1.05rem] font-bold -tracking-wide"
          style={{ color: 'var(--text)' }}
        >
          {topic.title}
          {topic.unlearned && (
            <span
              className="inline-block ml-2.5 px-2.5 py-0.5 text-[0.7rem] font-bold rounded-full border"
              style={{
                background: 'rgb(249 115 22 / 0.10)',
                color: '#f97316',
                borderColor: 'rgb(249 115 22 / 0.25)',
              }}
            >
              예습
            </span>
          )}
          {mastered && (
            <span className="inline-block ml-2 text-[0.78rem] text-emerald-500">
              ✓
            </span>
          )}
        </h2>
        <span
          className="text-xl transition-transform"
          style={{
            color: 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
          }}
        >
          ▾
        </span>
      </header>

      {open && (
        <div className="px-6 pb-6 animate-slideDown">
          <Analogy>{topic.analogy}</Analogy>
          <SubTabs>
            <Body />
          </SubTabs>
          {topic.quiz && <Quiz quiz={topic.quiz} />}
          <MasterButton topicId={topic.id} />
        </div>
      )}
    </section>
  );
}
