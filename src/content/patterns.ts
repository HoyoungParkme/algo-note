/**
 * 모듈명: patterns
 * 파일 경로: src/content/patterns.ts
 * 목적: 코딩 테스트 키워드 → 알고리즘 매핑 치트시트 데이터
 */

export interface PatternEntry {
  key: string;
  val: string;
}

export const PATTERNS: PatternEntry[] = [
  { key: '최단 거리, 최소 이동', val: 'BFS (가중치 없음) / 다익스트라 (가중치 있음)' },
  { key: '모든 경우, 경우의 수', val: '완전 탐색 (조합/순열/부분집합)' },
  { key: '연속 구간 합', val: '누적합 / 투 포인터' },
  { key: '선수 관계, 순서', val: '위상 정렬' },
  { key: '매번 최선의 선택', val: '그리디' },
  { key: '점화식, 결과 재활용', val: 'DP' },
  { key: '연결 여부, 탐색', val: 'BFS / DFS' },
  { key: '문자열 비교/매칭', val: '해시 / Counter / set' },
  { key: '최소/최대값 반복 추출', val: '우선순위 큐 (heapq)' },
  { key: '계층 구조, 부모-자식', val: '트리' },
  { key: '조건 만족 최솟값', val: '이분 탐색 (파라메트릭)' },
  { key: '정렬 후 빠른 탐색', val: '정렬 + 이분 탐색' },
  { key: '괄호 짝 맞추기', val: '스택' },
  { key: 'FIFO 순서 처리', val: '큐 (deque)' },
  { key: '조건 안 맞으면 되돌리기', val: '백트래킹' },
  { key: '같은 그룹 판별, 합치기', val: '유니온-파인드' },
  { key: '최소 비용으로 전체 연결', val: 'MST (크루스칼)' },
  { key: '모든 쌍 최단 거리', val: '플로이드-워셜' },
];
