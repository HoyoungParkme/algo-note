/**
 * 모듈명: MasterButton
 * 파일 경로: src/components/topic/MasterButton.tsx
 * 목적: 학습 완료 토글 버튼
 */

import { useStore } from '@/store/useStore';

interface Props {
  topicId: string;
}

export function MasterButton({ topicId }: Props) {
  const mastered = useStore((s) => Boolean(s.mastered[topicId]));
  const toggle = useStore((s) => s.toggleMaster);

  return (
    <button
      type="button"
      onClick={() => toggle(topicId)}
      className="mt-5 w-full py-3 rounded-xl text-[0.88rem] font-medium transition-all"
      style={{
        border: mastered ? '1px solid #22c55e' : '1px dashed var(--border)',
        background: mastered ? 'rgb(34 197 94 / 0.10)' : 'transparent',
        color: mastered ? '#22c55e' : 'var(--text-muted)',
      }}
    >
      {mastered ? '✓ 학습 완료' : '☐ 학습 완료 체크'}
    </button>
  );
}
