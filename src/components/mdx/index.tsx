/**
 * 모듈명: mdx/index
 * 파일 경로: src/components/mdx/index.tsx
 * 목적: MDX 본문에 자동 주입할 컴포넌트 매핑을 한 곳에 모음
 *       (MDXProvider에 components prop으로 전달)
 *       - <Why>/<How>/<Template>: 서브탭 섹션
 *       - <Tip>/<Warn>/<Prob>/<Analogy>: 안내 박스
 *       - pre: CodeBlock으로 매핑하여 모든 코드 블록에 복사 버튼 추가
 */

import type { ComponentProps } from 'react';
import { Why, How, Template } from './sections';
import { Tip, Warn, Prob, Analogy } from './boxes';
import { CodeBlock } from './CodeBlock';
import { SolutionBlock } from '@/components/topic/SolutionBlock';

/** MDX 본문에서 별도 import 없이 사용할 수 있는 컴포넌트 목록 */
export const mdxComponents = {
  Why,
  How,
  Template,
  Tip,
  Warn,
  Prob,
  Analogy,
  SolutionBlock,
  pre: (props: ComponentProps<'pre'>) => <CodeBlock {...props} />,
};

export { Why, How, Template, Tip, Warn, Prob, Analogy, CodeBlock };
