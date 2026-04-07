/**
 * 모듈명: SolutionBlock
 * 파일 경로: src/components/topic/SolutionBlock.tsx
 * 목적: 토픽 MDX의 코드 블록을 wrap해서 우상단에 "📖 자세히 보기" 버튼을 추가
 *       클릭 시 해당 problemId의 풀이 모달이 열린다.
 *
 * 사용 예 (MDX):
 *   <SolutionBlock problemId="boj-9663">
 *   ```python
 *   ...
 *   ```
 *   </SolutionBlock>
 */

import type { ReactNode } from 'react';
import { useStore } from '@/store/useStore';

interface Props {
  problemId: string;
  children: ReactNode;
}

export function SolutionBlock({ problemId, children }: Props) {
  const openSolution = useStore((s) => s.openSolution);

  return (
    <div className="relative group/sb my-3">
      {children}
      <button
        type="button"
        onClick={() => openSolution(problemId)}
        className="absolute top-2 right-20 px-2 py-1 rounded-md text-[0.7rem] font-medium opacity-0 group-hover/sb:opacity-100 transition-opacity"
        style={{
          background: 'var(--accent)',
          color: '#fff',
          border: '1px solid var(--accent)',
        }}
        aria-label="자세한 풀이 보기"
      >
        📖 자세히 보기
      </button>
    </div>
  );
}
