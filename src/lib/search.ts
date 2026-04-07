/**
 * 모듈명: search
 * 파일 경로: src/lib/search.ts
 * 목적: Fuse.js 인덱스를 빌드해 토픽 fuzzy 검색을 제공
 *       제목 + 비유 + 키워드를 가중치 있는 인덱스로 구성
 * 주요 의존성: fuse.js
 */

import Fuse from 'fuse.js';
import type { Topic } from './types';

export interface SearchHit {
  topic: Topic;
  kind: 'algo' | 'skill';
}

/** 검색 인덱스 빌드 (App에서 useMemo로 1회) */
export function buildSearchIndex(
  algoTopics: Topic[],
  skillTopics: Topic[]
): Fuse<SearchHit> {
  const items: SearchHit[] = [
    ...algoTopics.map((t) => ({ topic: t, kind: 'algo' as const })),
    ...skillTopics.map((t) => ({ topic: t, kind: 'skill' as const })),
  ];

  return new Fuse(items, {
    keys: [
      { name: 'topic.title', weight: 0.5 },
      { name: 'topic.analogy', weight: 0.2 },
      { name: 'topic.keywords', weight: 0.3 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 1,
  });
}
