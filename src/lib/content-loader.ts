/**
 * 모듈명: content-loader
 * 파일 경로: src/lib/content-loader.ts
 * 목적: src/content 하위 MDX 파일을 모두 import해서 객체로 반환
 *       알고리즘 / 스킬 / 풀이 세 종류를 분리해서 로드한다.
 * 주요 기능:
 *   - import.meta.glob으로 빌드 타임 자동 수집
 *   - num 기준 정렬 (알고리즘/스킬)
 *   - problemId → Solution 매핑 (풀이)
 * 주요 의존성: vite (import.meta.glob)
 */

import type { ComponentType } from 'react';
import type {
  Frontmatter,
  Solution,
  SolutionFrontmatter,
  Topic,
} from './types';

interface MdxModule {
  default: ComponentType;
  frontmatter: Frontmatter;
}

interface SolutionMdxModule {
  default: ComponentType;
  frontmatter: SolutionFrontmatter;
}

/** algorithms 폴더의 모든 MDX 모듈을 즉시 로드 */
const algoModules = import.meta.glob<MdxModule>(
  '../content/algorithms/*.mdx',
  { eager: true }
);

/** skills 폴더의 모든 MDX 모듈을 즉시 로드 */
const skillModules = import.meta.glob<MdxModule>(
  '../content/skills/*.mdx',
  { eager: true }
);

/** solutions 폴더의 모든 MDX 모듈을 즉시 로드 */
const solutionModules = import.meta.glob<SolutionMdxModule>(
  '../content/solutions/*.mdx',
  { eager: true }
);

function toSortedTopics(modules: Record<string, MdxModule>): Topic[] {
  const topics: Topic[] = Object.values(modules).map((mod) => ({
    ...mod.frontmatter,
    Component: mod.default,
  }));
  topics.sort((a, b) => a.num.localeCompare(b.num));
  return topics;
}

/** 정렬된 알고리즘 토픽 목록을 반환한다. */
export function loadAlgorithms(): Topic[] {
  return toSortedTopics(algoModules);
}

/** 정렬된 실전 스킬 토픽 목록을 반환한다. */
export function loadSkills(): Topic[] {
  return toSortedTopics(skillModules);
}

/**
 * problemId → Solution 매핑을 반환한다.
 *
 * Returns:
 *   Record<string, Solution>: { 'boj-9663': Solution, ... }
 */
export function loadSolutions(): Record<string, Solution> {
  const map: Record<string, Solution> = {};
  for (const mod of Object.values(solutionModules)) {
    const sol: Solution = {
      ...mod.frontmatter,
      Component: mod.default,
    };
    map[sol.id] = sol;
  }
  return map;
}
