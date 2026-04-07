/**
 * 모듈명: types
 * 파일 경로: src/lib/types.ts
 * 목적: MDX 토픽의 frontmatter 스키마와 Topic 객체 타입 정의
 * 주요 의존성: 없음
 */

import type { ComponentType } from 'react';

/** 알고리즘 카테고리 식별자 (스킬은 'meta'를 사용) */
export type Category =
  | 'meta' // 시간 복잡도, 실전 스킬 등 메타 토픽
  | 'common' // 공통 패턴
  | 'array'
  | 'string'
  | 'stack'
  | 'queue'
  | 'binary'
  | 'sort'
  | 'brute'
  | 'twoptr'
  | 'greedy'
  | 'psum'
  | 'tree'
  | 'graph'
  | 'pq'
  | 'hash'
  | 'bfs'
  | 'dfs'
  | 'dijkstra'
  | 'dp'
  | 'topo'
  | 'backtrack'
  | 'unionfind'
  | 'mst'
  | 'floyd';

/** 난이도 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** 퀴즈 한 문항 */
export interface Quiz {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

/** MDX frontmatter (작성 시 yaml로 들어감) */
export interface Frontmatter {
  id: string;
  num: string;
  title: string;
  analogy: string;
  category: Category;
  difficulty: Difficulty;
  unlearned?: boolean;
  keywords?: string[];
  quiz?: Quiz;
}

/** 런타임에 사용하는 토픽 객체 (frontmatter + 본문 컴포넌트) */
export interface Topic extends Frontmatter {
  Component: ComponentType;
}

/** 풀이(Solution) MDX의 frontmatter 스키마 */
export interface SolutionFrontmatter {
  id: string; // 예: 'boj-9663'
  problemNumber: number; // 예: 9663
  title: string; // 예: 'N-Queen'
  url: string; // 외부 BOJ 링크
  topicId: string; // 매핑되는 알고리즘 토픽 id (예: 'backtrack')
  difficulty: Difficulty;
  tags: string[];
  timeComplexity: string; // 예: 'O(N!)'
  spaceComplexity: string; // 예: 'O(N)'
}

/** 런타임 풀이 객체 (frontmatter + 본문 MDX 컴포넌트) */
export interface Solution extends SolutionFrontmatter {
  Component: ComponentType;
}
