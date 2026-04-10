/**
 * 모듈명: problems
 * 파일 경로: src/content/problems.ts
 * 목적: 사용자가 푼 BOJ 문제 메타데이터. "푼 문제" 탭에서 카드로 표시.
 *       각 문제는 public/problems/ 안의 standalone HTML 시각화와 매핑된다.
 */

export interface Problem {
  id: string;
  num: number;
  title: string;
  category: string;
  difficulty: string;
  url: string;
  htmlFile: string;
  description: string;
}

export const PROBLEMS: Problem[] = [
  {
    id: 'boj-2178',
    num: 2178,
    title: '미로 탐색',
    category: 'BFS',
    difficulty: 'Silver I',
    url: 'https://www.acmicpc.net/problem/2178',
    htmlFile: 'problems/boj-2178.html',
    description: 'BFS로 N×M 격자 미로의 최단 경로 찾기',
  },
  {
    id: 'boj-2217',
    num: 2217,
    title: '로프',
    category: '그리디',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/2217',
    htmlFile: 'problems/boj-2217.html',
    description: '밧줄을 병렬로 묶어 최대 중량 구하기',
  },
  {
    id: 'boj-17626',
    num: 17626,
    title: 'Four Squares',
    category: 'DP',
    difficulty: 'Silver III',
    url: 'https://www.acmicpc.net/problem/17626',
    htmlFile: 'problems/boj-17626.html',
    description: 'N을 최소 개수의 제곱수 합으로 표현',
  },
];
