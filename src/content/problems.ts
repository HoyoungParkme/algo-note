/**
 * 모듈명: problems
 * 파일 경로: src/content/problems.ts
 * 목적: 사용자가 푼 BOJ 문제 메타데이터. "푼 문제" 탭에서 카드로 표시.
 *       각 문제는 public/problems/ 안의 standalone HTML 시각화와 매핑되거나,
 *       Python 풀이 코드를 직접 표시한다.
 */

export interface Problem {
  id: string;
  num: number;
  title: string;
  category: string;
  difficulty: string;
  url: string;
  htmlFile?: string;
  description: string;
  code: string;
}

export const PROBLEMS: Problem[] = [
  {
    id: 'boj-3033',
    num: 3033,
    title: '가장 긴 문자열',
    category: '문자열',
    difficulty: 'Platinum III',
    url: 'https://www.acmicpc.net/problem/3033',
    description: '문자열, 해싱, 접미사 배열과 LCP 배열, 라빈–카프',
    code: `L = int(input())
S = input()

# 해쉬 값을 구할 준비물
mod = 1e9 + 7
po = [0] * L
po[0] = 1 # po[i] = 31^i
for i in range(1, L):
    po[i] = po[i - 1] * 31 % mod

low = 1
high = L - 1
answer = 0

while low <= high:
    mid = (low + high) // 2

    # 길이가 mid인 부분 문자열 중에 2번 이상 등장하는게 있나?
    found = False

    # 가장 앞에 있는 길이 mid인 부분 문자열의 해쉬값
    hash = 0
    for i in range(mid):
        hash *= 31
        hash %= mod
        hash += ord(S[i]) - ord('a') + 1
        hash %= mod

    check = {}

    for i in range(0, L - mid +1):
        # S[i:i+mid] 문자열의 해쉬값을 체크
        if hash in check:
            for j in check[hash]:
                if S[j:j+mid] == S[i:i+mid]:
                    found = True
                    break
            check[hash].append(i)
            if found:
                break
        else:
            check[hash] = [i]

        # 해쉬값을 갱신
        hash += mod - (ord(S[i]) - ord('a') + 1) * po[mid - 1]
        hash %= mod
        hash *= 31
        hash %= mod
        if i + mid < L:
            hash += ord(S[i + mid]) - ord('a') + 1
            hash %= mod

    if found:
        answer = mid
        low = mid + 1
    else:
        high = mid -1

print(answer)`,
  },
  {
    id: 'boj-1766',
    num: 1766,
    title: '문제집',
    category: '자료 구조',
    difficulty: 'Gold II',
    url: 'https://www.acmicpc.net/problem/1766',
    description: '자료 구조, 그래프 이론, 우선순위 큐, 방향 비순환 그래프, 위상 정렬',
    code: `from queue import PriorityQueue

N, M = list(map(int, input().split()))

adj = [[] for _ in range(N)]
need_learn = [0] * N

for i in range(M):
    a,b = list(map(int, input().split()))
    adj[a - 1].append(b-1)
    need_learn[b - 1] += 1

# 위상 정렬
pq = PriorityQueue() # 수강 가능한 목록
for i in range(N):
    if need_learn[i] == 0:
        pq.put(i)

learn = []
while pq.qsize() != 0:
    u = pq.get()
    learn.append(u)

    for v in adj[u]:
        need_learn[v] -= 1
        if need_learn[v] == 0:
            pq.put(v)

for i in range(N):
    print(learn[i] + 1, end=" ")`,
  },
  {
    id: 'boj-1238',
    num: 1238,
    title: '파티',
    category: '그래프 이론',
    difficulty: 'Gold III',
    url: 'https://www.acmicpc.net/problem/1238',
    description: '그래프 이론, 최단 경로, 데이크스트라',
    code: `from queue import PriorityQueue

N, M, X = list(map(int, input().split()))
X -= 1

adj = [[] for _ in range(N)]
r_adj = [[] for _ in range(N)]
for _ in range(M):
    start, end, time = list(map(int, input().split()))
    adj[start - 1].append((end-1, time))
    r_adj[end - 1].append((start-1, time))

dist = [1e9] * N
dist[X] = 0
pq = PriorityQueue()
pq.put((0,X))

while pq.qsize() != 0:
    d, u = pq.get()
    if d != dist[u]:
        continue
    for v, w in adj[u]:
        if dist[v] > dist[u] + w:
            dist[v] = dist[u] + w
            pq.put((dist[v], v))


r_dist = [1e9] * N
r_dist[X] = 0
pq = PriorityQueue()
pq.put((0,X))

while pq.qsize() != 0:
    d, u = pq.get()
    if d != r_dist[u]:
        continue
    for v, w in r_adj[u]:
        if r_dist[v] > r_dist[u] + w:
            r_dist[v] = r_dist[u] + w
            pq.put((r_dist[v], v))

max_dist = 0
for i in range(N):
    if max_dist < dist[i] + r_dist[i]:
        max_dist = dist[i] + r_dist[i]
print(max_dist)`,
  },
  {
    id: 'boj-2252',
    num: 2252,
    title: '줄 세우기',
    category: '그래프 이론',
    difficulty: 'Gold III',
    url: 'https://www.acmicpc.net/problem/2252',
    description: '그래프 이론, 방향 비순환 그래프, 위상 정렬',
    code: `from collections import deque

N, M = list(map(int, input().split()))

adj = [[] for _ in range(N)]
need_learn = [0] * N

for i in range(M):
    a,b = list(map(int, input().split()))
    adj[a - 1].append(b-1)
    need_learn[b - 1] += 1

# 위상 정렬
queue = deque([]) # 수강 가능한 목록
for i in range(N):
    if need_learn[i] == 0:
        queue.append(i)

learn = []
while len(queue) != 0:
    u = queue.popleft()
    learn.append(u)

    for v in adj[u]:
        need_learn[v] -= 1
        if need_learn[v] == 0:
            queue.append(v)

for i in range(N):
    print(learn[i] + 1, end=" ")`,
  },
  {
    id: 'boj-1715',
    num: 1715,
    title: '카드 정렬하기',
    category: '자료 구조',
    difficulty: 'Gold IV',
    url: 'https://www.acmicpc.net/problem/1715',
    description: '자료 구조, 그리디 알고리즘, 우선순위 큐',
    code: `from queue import PriorityQueue

N = int(input())
pq = PriorityQueue()

for _ in range(N):
    card = int(input())
    pq.put(card)

answer = 0
while pq.qsize() > 1:
    min_value_1 = pq.get()
    min_value_2 = pq.get()
    pq.put(min_value_1 + min_value_2)
    answer += min_value_1 + min_value_2

print(answer)`,
  },
  {
    id: 'boj-1753',
    num: 1753,
    title: '최단경로',
    category: '그래프 이론',
    difficulty: 'Gold IV',
    url: 'https://www.acmicpc.net/problem/1753',
    description: '그래프 이론, 최단 경로, 데이크스트라',
    code: `# from queue import PriorityQueue
import heapq
import sys
input = sys.stdin.readline

V, E = list(map(int, input().split()))
K = int(input()) - 1

adj = [[] for _ in range(V)]

for _ in range(E):
    u, v, w = list(map(int, input().split()))
    adj[u - 1].append((v - 1, w))

dist = [1e9] * V
dist[K] = 0
pq = []
heapq.heappush(pq, (0,K))
# pq = PriorityQueue()
# pq.put((0,K)) # 초기 K값은 시작이 0이니깐 이상태로 튜플에 넣음

# while pq.qsize() != 0:
#     d, u = pq.get()
#
#     if d != dist[u]:
#         continue
#
#     for v, w in adj[u]:
#         if dist[v] > dist[u] + w:
#             dist[v] = dist[u] + w
#             pq.put((dist[v], v))

while pq:
    d, u = heapq.heappop(pq)

    if d != dist[u]:
        continue

    for v, w in adj[u]:
        if dist[v] > dist[u] + w:
            dist[v] = dist[u] + w
            heapq.heappush(pq, (dist[v], v))

for i in range(V):
    if dist[i] == 1e9:
        print("INF")
    else:
        print(dist[i])`,
  },
  {
    id: 'boj-14267',
    num: 14267,
    title: '회사 문화 1',
    category: '다이나믹 프로그래밍',
    difficulty: 'Gold IV',
    url: 'https://www.acmicpc.net/problem/14267',
    description: '다이나믹 프로그래밍, 그래프 이론, 그래프 탐색, 트리, 깊이 우선 탐색, 트리에서의 다이나믹 프로그래밍',
    code: `N, C = map(int, input().split())
parent = list(map(int, input().split()))

for i in range(1,N):
    parent[i] -= 1

good = [0] * N
for i in range(C):
    a, b = map(int, input().split())
    good[a-1] += b

total = [0] * N
for i in range(1, N):
    total[i] += good[i] + total[parent[i]]

print(*total)`,
  },
  {
    id: 'boj-2343',
    num: 2343,
    title: '기타 레슨',
    category: '이분 탐색',
    difficulty: 'Gold V',
    url: 'https://www.acmicpc.net/problem/2343',
    description: '이분 탐색, 매개 변수 탐색',
    code: `n = list(map(int, input().split()))
play = list(map(int, input().split()))

N = n[0]
blue = n[1]

start = max(play)
end = sum(play)
answer = 0

while start <= end:
    tmp = 0
    cnt = 1
    mid = (start + end)//2

    for i in play:
        if tmp + i <= mid:
            tmp += i
        else:
            cnt += 1
            tmp = i

    if cnt > blue:
        start = mid + 1
    else:
        answer = mid
        end = mid - 1

print(answer)`,
  },
  {
    id: 'boj-1389',
    num: 1389,
    title: '케빈 베이컨의 6단계 법칙',
    category: '그래프 이론',
    difficulty: 'Silver I',
    url: 'https://www.acmicpc.net/problem/1389',
    description: '그래프 이론, 그래프 탐색, 너비 우선 탐색, 최단 경로, 플로이드–워셜',
    code: `import sys
from collections import deque

input = sys.stdin.readline
N, M = list(map(int, input().split()))
adj = [[] for _ in range(N)]

for _ in range(M):
    u, v = list(map(int, input().split()))
    adj[u-1].append(v-1)
    adj[v-1].append(u-1)

min_kevin = 1e9
min_person = -1

for i in range(N):
    visit = [False] * N
    visit[i] = True
    dist = [-1] * N
    dist[i] = 0
    queue = deque([i])

    while len(queue) != 0:
        u = queue.popleft()

        for v in adj[u]:
            if not visit[v]:
                queue.append(v)
                visit[v] = True
                dist[v] = dist[u] + 1
    kevin = sum(dist)

    if kevin < min_kevin:
        min_kevin = kevin
        min_person = i + 1

print(min_person)`,
  },
  {
    id: 'boj-1743',
    num: 1743,
    title: '음식물 피하기',
    category: '그래프 이론',
    difficulty: 'Silver I',
    url: 'https://www.acmicpc.net/problem/1743',
    description: '그래프 이론, 그래프 탐색, 너비 우선 탐색, 깊이 우선 탐색, 격자 그래프, 플러드 필',
    code: `from collections import deque

N, M, K = map(int, input().split())

points = set()
for _ in range(K):
    a,b = map(int, input().split())
    points.add((a,b))

visit = set()
move = [(0,1), (0,-1), (1,0), (-1,0)]
max_num = 0

def bfs(start):
    q = deque([start])
    visit.add(start)
    cnt = 1

    while q:
        x, y = q.popleft()
        for dx, dy in move:
            nx, ny = x + dx, y + dy
            if (nx, ny) in points and (nx, ny) not in visit:
                q.append((nx, ny))
                visit.add((nx, ny))
                cnt += 1

    return cnt


for i in points:
    if i not in visit:
        max_num = max(max_num, bfs(i))

print(max_num)`,
  },
  {
    id: 'boj-1946',
    num: 1946,
    title: '신입 사원',
    category: '그리디 알고리즘',
    difficulty: 'Silver I',
    url: 'https://www.acmicpc.net/problem/1946',
    description: '그리디 알고리즘, 정렬',
    code: `import sys

for _ in range(int(input())):
    arr = []

    for _ in range(int(input())):
        a, b = map(int, sys.stdin.readline().split())
        arr.append([a,b])

    arr.sort()
    cnt = 1
    standard = arr[0][1]

    for i in range(1, len(arr)):
        if arr[i][1] < standard:
            cnt += 1
            standard = arr[i][1]

    print(cnt)`,
  },
  {
    id: 'boj-2178',
    num: 2178,
    title: '미로 탐색',
    category: '그래프 이론',
    difficulty: 'Silver I',
    url: 'https://www.acmicpc.net/problem/2178',
    htmlFile: 'problems/boj-2178.html',
    description: '그래프 이론, 그래프 탐색, 너비 우선 탐색, 격자 그래프',
    code: `import sys 
from collections import deque

N, M  = map(int, input().split())
grid = [list(map(int, input().strip())) for _ in range(N)]
dist = [[0] * M for _ in range(N)]
dist[0][0] = 1

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

q = deque([(0,0)])

while q:
    x, y = q.popleft()
    for i in range(4):
        nx,ny = x + dx[i], y + dy[i]
        if 0 <= nx < N and 0 <= ny < M:
            if grid[nx][ny] == 1 and dist[nx][ny] == 0:
                dist[nx][ny] = dist[x][y] + 1
                q.append((nx,ny))

print(dist[N-1][M-1])`,
  },
  {
    id: 'boj-5525',
    num: 5525,
    title: 'IOIOI',
    category: '문자열',
    difficulty: 'Silver I',
    url: 'https://www.acmicpc.net/problem/5525',
    description: '문자열',
    code: `N = int(input()) # 몇 번 반복된 "IOI" 형태를 만들지
M = int(input()) # 문자열 S의 길이
S = input() # 검사할 문자열 S

# 숫자가 너무 커지는 걸 막기 위한 값 (나머지 연산에 사용)
mod = 1e9 + 7

# 31의 거듭제곱 값을 저장할 리스트
# 예: [1, 31, 31^2, 31^3, ...]
po = [0] * M

# 첫 값은 31^0 = 1
po[0] = 1

# 31의 거듭제곱들을 차례대로 계산
for i in range(1, M):
    po[i] = (po[i - 1] * 31) % mod


# 우리가 찾고 싶은 문자열을 만듦 (처음은 "I")
Pn = "I"
for i in range(N):
    Pn += "OI"

# 찾고 싶은 문자열의 길이
K = len(Pn)

# 우리가 찾고 싶은 문자열의 해시값 (숫자 형태)
Pn_hash = 0

# 문자열을 숫자로 바꿔서 하나의 큰 숫자로 만듦
for i in range(K):
    Pn_hash = (Pn_hash * 31 + (ord(Pn[i]) - ord('A') + 1)) % mod

# S의 처음 K글자 해시값 (처음 비교할 구간)
S_hash = 0

# S의 앞에서부터 K글자를 이용해 해시값 계산
for i in range(K):
    S_hash = (S_hash * 31 + (ord(S[i]) - ord('A') + 1)) % mod

# 찾고 싶은 문자열이 몇 번 나오는지 셀 변수
count = 0

# S에서 길이 K짜리 문자열을 하나씩 확인
for i in range(M - K + 1):

    # 해시값이 같으면 같은 문자열일 가능성이 큼
    if S_hash == Pn_hash:
        count += 1

    # 다음 칸으로 이동할 수 있을 때만 실행
    if i + K < M:

        # 현재 구간에서 맨 앞 글자를 숫자로 바꿈
        # 이 글자는 다음 구간에서 빠짐
        first_char = ord(S[i]) - ord('A') + 1

        # 맨 앞 글자가 해시에서 차지하던 값을 빼줌
        S_hash = (S_hash - first_char * po[K - 1]) % mod

        # 한 칸 왼쪽으로 밀기 (자릿수 이동)
        S_hash = (S_hash * 31) % mod

        # 다음 구간에서 새로 들어오는 글자를 뒤에 추가
        S_hash = (S_hash + (ord(S[i + K]) - ord('A') + 1)) % mod

# 최종 결과 출력
print(count)`,
  },
  {
    id: 'boj-21318',
    num: 21318,
    title: '피아노 체조',
    category: '누적 합',
    difficulty: 'Silver I',
    url: 'https://www.acmicpc.net/problem/21318',
    description: '누적 합',
    code: `import sys
input = sys.stdin.readline

N = int(input())
level = list(map(int, input().split()))
Q = int(input())

arr = [0] * N
for i in range(N - 1):
    if level[i] > level[i+1]:
        arr[i] = 1

psum = [0] * (N+1)
for i in range(N-1):
    if i == 0:
        psum[i] = arr[i]
    else:
            psum[i] = psum[i-1] + arr[i]

for _ in range(Q):
    x, y = map(int, input().split())
    x -= 1
    y -= 1

    if x == y:
        print(0)
        continue

    ans = psum[y-1]
    if x > 0:
        ans -= psum[x-1] 

    print(ans)`,
  },
  {
    id: 'boj-1182',
    num: 1182,
    title: '부분수열의 합',
    category: '브루트포스 알고리즘',
    difficulty: 'Silver II',
    url: 'https://www.acmicpc.net/problem/1182',
    description: '브루트포스 알고리즘, 백트래킹',
    code: `from itertools import combinations

N, S = map(int, input().split())
nums = list(map(int, input().split()))


cnt = 0
for i in range(N):
    tmp = list(combinations(nums, i+1))

    for i in range(len(tmp)):
        if sum(tmp[i]) == S:
            cnt += 1
        
print(cnt)`,
  },
  {
    id: 'boj-2512',
    num: 2512,
    title: '예산',
    category: '이분 탐색',
    difficulty: 'Silver II',
    url: 'https://www.acmicpc.net/problem/2512',
    description: '이분 탐색, 매개 변수 탐색',
    code: `num = int(input())
local = list(map(int, input().split()))
money = int(input())

start = 0
end = max(local)
answer = 0

while start <= end:
    mid = (start + end)//2

    total = 0
    for i in local:
        if i > mid:
            total += mid
        else:
            total += i

    if total <= money:
        answer = mid
        start = mid + 1

    else:
        end = mid - 1

print(answer)`,
  },
  {
    id: 'boj-2805',
    num: 2805,
    title: '나무 자르기',
    category: '이분 탐색',
    difficulty: 'Silver II',
    url: 'https://www.acmicpc.net/problem/2805',
    description: '이분 탐색, 매개 변수 탐색',
    code: `N, M = list(map(int, input().split()))
tree = list(map(int, input().split()))

lo, hi = 0, max(tree)

def check(n):
    tmp = 0
    for i in tree:
        if i > n:
            tmp += (i - n)
    return tmp >= M

answer = 0
while lo <= hi:
    mid = (lo + hi) // 2

    if check(mid):
        answer = mid
        lo = mid + 1
    else:
        hi = mid - 1

print(answer)`,
  },
  {
    id: 'boj-5567',
    num: 5567,
    title: '결혼식',
    category: '그래프 이론',
    difficulty: 'Silver II',
    url: 'https://www.acmicpc.net/problem/5567',
    description: '그래프 이론, 그래프 탐색, 너비 우선 탐색',
    code: `N = int(input())
M = int(input())

adj = [[] for _ in range(N)]

for _ in range(M):
    a, b = map(int, input().split())
    adj[a-1].append(b-1)
    adj[b-1].append(a-1)

friend = [0] * N
for i in adj[0]:
    friend[i] = 1

friend_friend = [0] * N
for i in range(N):
    if friend[i] == 0:
        continue

    for j in adj[i]:
        if j!=0 and friend[j]==0: #이미 친구 중복 제거
            friend_friend[j] = 1

print(sum(friend) + sum(friend_friend))`,
  },
  {
    id: 'boj-10819',
    num: 10819,
    title: '차이를 최대로',
    category: '브루트포스 알고리즘',
    difficulty: 'Silver II',
    url: 'https://www.acmicpc.net/problem/10819',
    description: '브루트포스 알고리즘, 백트래킹',
    code: `from itertools import combinations, permutations

N = int(input())
pocket = list(map(int, input().split()))

answer = 0
for i in permutations(pocket, N):
    diff = 0
    for j in range(0, len(i)-1):
        diff += abs(i[j] - i[j+1])

    if diff > answer:
        answer = diff

print(answer)`,
  },
  {
    id: 'boj-11724',
    num: 11724,
    title: '연결 요소의 개수',
    category: '그래프 이론',
    difficulty: 'Silver II',
    url: 'https://www.acmicpc.net/problem/11724',
    description: '그래프 이론, 그래프 탐색, 너비 우선 탐색, 깊이 우선 탐색',
    code: `import sys
from collections import deque
input = sys.stdin.readline

N, M = list(map(int, input().split()))
adj = [[] for i in range(N)]

for _ in range(M):
    u, v = list(map(int, input().split()))
    adj[u-1].append(v-1)
    adj[v-1].append(u-1)

visit = [False] * N
cnt = 0

for i in range(N):
    if visit[i]:
        continue

    cnt += 1
    queue = deque([i])
    visit[i] = True

    while len(queue) != 0:
        u = queue.popleft()

        for v in adj[u]:
            if not visit[v]:
                queue.append(v)
                visit[v] = True

print(cnt)`,
  },
  {
    id: 'boj-11725',
    num: 11725,
    title: '트리의 부모 찾기',
    category: '그래프 이론',
    difficulty: 'Silver II',
    url: 'https://www.acmicpc.net/problem/11725',
    description: '그래프 이론, 그래프 탐색, 트리, 너비 우선 탐색, 깊이 우선 탐색',
    code: `import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline

N = int(input())
adj = [[] for _ in range(N)]

for _ in range(N - 1):
    a, b = map(int, input().split())
    adj[a - 1].append(b - 1)
    adj[b - 1].append(a - 1)

visit = [False] * N
parent = [-1] * N

def dfs(u):
    visit[u] = True
    for v in adj[u]:
        if not visit[v]:
            parent[v] = u
            dfs(v)

dfs(0)

for i in range(1, N):
    print(parent[i] + 1)`,
  },
  {
    id: 'boj-14465',
    num: 14465,
    title: '소가 길을 건너간 이유 5',
    category: '누적 합',
    difficulty: 'Silver II',
    url: 'https://www.acmicpc.net/problem/14465',
    description: '누적 합, 슬라이딩 윈도우',
    code: `N, K, B = map(int, input().split())
broken = []

for i in range(B):
    broken.append(int(input()))

# 고장난 신호등
tmp = [0] * N
for i in broken:
    tmp[i-1] = 1

# 누적합
p = [0] * N
p[0] = tmp[0]
for i in range(1, N):
    p[i] = p[i-1] + tmp[i]


answer = p[K-1]
for i in range(K, N):
    answer = min(answer, p[i] - p[i-K])

print(answer)`,
  },
  {
    id: 'boj-1463',
    num: 1463,
    title: '1로 만들기',
    category: '다이나믹 프로그래밍',
    difficulty: 'Silver III',
    url: 'https://www.acmicpc.net/problem/1463',
    description: '다이나믹 프로그래밍',
    code: `N = int(input())

a = [0] * (N + 1)
a[0] = 1

for i in range(2, N+1):
    # 1을 뺀거 -> 1빼면 이전에 걸로 돌아가는거니깐 -> ex) a[2] - 1 = a[1]
    # +1을 해주는건 몇번 했는지 체크하는데 돌아간거 한번 체크
    a[i] = a[i - 1] + 1

    if i % 3 ==0:
        a[i] = min(a[i], a[i//3] + 1)

    if i % 2 == 0:
        a[i] = min(a[i], a[i//2] +1 )

print(a[N])`,
  },
  {
    id: 'boj-2579',
    num: 2579,
    title: '계단 오르기',
    category: '다이나믹 프로그래밍',
    difficulty: 'Silver III',
    url: 'https://www.acmicpc.net/problem/2579',
    description: '다이나믹 프로그래밍',
    code: `N = int(input())
S = [0] * N
for i in range(N):
     S[i] = int(input())

A = [0] * N
B = [0] * N

A[0] = S[0]
B[0] = S[0]

for i in range(1,N):
    if i >= 2:
        A[i] = S[i] + max(A[i-2], B[i-2])
    else:
        A[i] = S[i]

    if i >= 3:
        B[i] = S[i] + S[i - 1] + max(A[i-3], B[i-3])
    else:
        B[i] = S[i] + S[i-1]

print(max(A[N-1],B[N-1]))`,
  },
  {
    id: 'boj-2606',
    num: 2606,
    title: '바이러스',
    category: '그래프 이론',
    difficulty: 'Silver III',
    url: 'https://www.acmicpc.net/problem/2606',
    description: '그래프 이론, 그래프 탐색, 너비 우선 탐색, 깊이 우선 탐색',
    code: `import sys

input = sys.stdin.readline

N = int(input())
M = int(input())
adj = [[] for _ in range(N)]

for _ in range(M):
    a, b = list(map(int, input().split()))
    adj[a-1].append(b-1)
    adj[b-1].append(a-1)

visit = [False] * N

def dfs(node):
    visit[node] = True
    for n in adj[node]:
        if not visit[n]:
            dfs(n)


dfs(0)
cnt = 0
for i in visit:
    if i:
        cnt +=1

print(cnt - 1)`,
  },
  {
    id: 'boj-7795',
    num: 7795,
    title: '먹을 것인가 먹힐 것인가',
    category: '정렬',
    difficulty: 'Silver III',
    url: 'https://www.acmicpc.net/problem/7795',
    description: '정렬, 이분 탐색, 두 포인터',
    code: `import sys

N = int(input())

for i in range(N):
    n, m = map(int,sys.stdin.readline().split())
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))
    a.sort()
    b.sort()

    cnt, start_a, start_b  = 0, 0, 0

    while start_a < n:
        if start_b == m:
            cnt += start_b
            start_a +=1
        else:
            if a[start_a] > b[start_b]:
                start_b += 1
            else:
                cnt += start_b
                start_a += 1
    print(cnt)`,
  },
  {
    id: 'boj-15650',
    num: 15650,
    title: 'N과 M (2)',
    category: '백트래킹',
    difficulty: 'Silver III',
    url: 'https://www.acmicpc.net/problem/15650',
    description: '백트래킹',
    code: `from itertools import combinations

N, M = list(map(int, input().split()))

nums = [i for i in range(1, N +1)]

for i in list(combinations(nums, M)):
    print(*i)`,
  },
  {
    id: 'boj-17626',
    num: 17626,
    title: 'Four Squares',
    category: '다이나믹 프로그래밍',
    difficulty: 'Silver III',
    url: 'https://www.acmicpc.net/problem/17626',
    htmlFile: 'problems/boj-17626.html',
    description: '다이나믹 프로그래밍, 브루트포스 알고리즘',
    code: `import sys
input = sys.stdin.readline

N = int(input())
dp = [0] + [4] * N  

for i in range(1, N + 1):
    if (i ** 0.5).is_integer():
        dp[i] = 1
        continue

    for j in range(1, int(i**0.5)+1):  
        dp[i] = min(dp[i], 1 + dp[i - j*j])

print(dp[N])`,
  },
  {
    id: 'boj-1158',
    num: 1158,
    title: '요세푸스 문제',
    category: '구현',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/1158',
    description: '구현, 자료 구조, 큐',
    code: `from collections import deque
N, K = map(int, input().split())

people = [i for i in range(1, N+1)]    

q = deque(people)

answer = []

for i in range(N):
    q.rotate(-(K - 1))
    answer.append(q.popleft())

print('<' + ', '.join(map(str, answer)) + '>')`,
  },
  {
    id: 'boj-2003',
    num: 2003,
    title: '수들의 합 2',
    category: '브루트포스 알고리즘',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/2003',
    description: '브루트포스 알고리즘, 누적 합, 두 포인터',
    code: `N, M = map(int, input().split())
pocket = list(map(int, input().split()))

left = 0
right = 0
pocket_sum = 0
answer = 0

while True:
    if pocket_sum >= M:
        if pocket_sum == M:
            answer += 1
        pocket_sum -= pocket[left]
        left += 1
    elif right == N:
        break
    else:
        pocket_sum += pocket[right]
        right += 1

print(answer)`,
  },
  {
    id: 'boj-2164',
    num: 2164,
    title: '카드2',
    category: '자료 구조',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/2164',
    description: '자료 구조, 큐',
    code: `import sys
from collections import deque

N = int(input())
q = deque([])
cnt = 0

for i in range(1,N+1):
    q.append(i)

while len(q) > 1:
    cnt += 1
    if cnt % 2 == 1:
        q.popleft()
    else:
        q.append(q[0])
        q.popleft()
print(*q)`,
  },
  {
    id: 'boj-2217',
    num: 2217,
    title: '로프',
    category: '수학',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/2217',
    htmlFile: 'problems/boj-2217.html',
    description: '수학, 그리디 알고리즘, 정렬',
    code: `N = int(input())
ropes = [int(input()) for _ in range(N)]
ropes.sort(reverse = True)

max_weight = 0

for i in range(N):
    max_weight = max(max_weight, ropes[i] * (i+1))

print(max_weight)`,
  },
  {
    id: 'boj-2417',
    num: 2417,
    title: '정수 제곱근',
    category: '수학',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/2417',
    description: '수학, 이분 탐색',
    code: `N = int(input())

left = 0
right = 2**32

answer = -1
while left <= right:
    mid = (left + right) // 2
    if mid ** 2 < N:
        left = mid + 1
    else:
        answer = mid
        right = mid - 1
print(answer)`,
  },
  {
    id: 'boj-2847',
    num: 2847,
    title: '게임을 만든 동준이',
    category: '그리디 알고리즘',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/2847',
    description: '그리디 알고리즘',
    code: `N = int(input())
level = [int(input()) for _ in range(N)]
answer = 0

for i in range(N - 1, 0, -1):
    if level[i] <= level[i-1]:
        diff = level[i-1] - (level[i] - 1)
        answer += diff
        level[i-1] = level[i] - 1

print(answer)`,
  },
  {
    id: 'boj-4949',
    num: 4949,
    title: '균형잡힌 세상',
    category: '자료 구조',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/4949',
    description: '자료 구조, 문자열, 스택',
    code: `left = []

while True:
  tmp = input()
  
  if tmp == '.':
    break

  flag = True
  left = []

  for j in tmp:
    if j in [']', ')'] and len(left) == 0:
      flag = False
      break

    if j == ']':
      if left[-1] == '[':
        left.pop()
      else:
        flag = False
        break

    elif j == ')':
      if left[-1] == '(':
        left.pop()
      else:
        flag = False
        break

    elif j in ['[', '(']:
      left.append(j)

  if flag == False or len(left) > 0:
    print('no')
  else:
    print('yes')`,
  },
  {
    id: 'boj-10773',
    num: 10773,
    title: '제로',
    category: '구현',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/10773',
    description: '구현, 자료 구조, 스택',
    code: `cnt = int(input())
money = []

for i in range(cnt):
  n = int(input())
  if n == 0:
    money.pop()
  else:
    money.append(n)

print(sum(money))`,
  },
  {
    id: 'boj-11399',
    num: 11399,
    title: 'ATM',
    category: '그리디 알고리즘',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/11399',
    description: '그리디 알고리즘, 정렬',
    code: `N = int(input())
waiting = list(map(int, input().split()))

waiting.sort(reverse = True)
answer = 0

for i in range(N):
    answer += sum(waiting[i:])
print(answer)`,
  },
  {
    id: 'boj-18258',
    num: 18258,
    title: '큐 2',
    category: '자료 구조',
    difficulty: 'Silver IV',
    url: 'https://www.acmicpc.net/problem/18258',
    description: '자료 구조, 큐',
    code: `import sys
from collections import deque

N = int(input())
q = deque([])

for i in range(N):
    command = sys.stdin.readline()
    command = command.split()

    if command[0] == 'push':
        q.append(command[1])

    if command[0] == 'pop':
        if len(q) > 0:
            print(q.popleft())
        else:
            print(-1)

    if command[0] == 'size':
        print(len(q))

    if command[0] == 'empty':
        if len(q) == 0:
            print(1)
        else:
            print(0)

    if command[0] == 'front':
        if len(q) > 0:
            print(q[0])
        else:
            print(-1)

    if command[0] == 'back':
        if len(q) > 0:
            print(q[-1])
        else:
            print(-1)`,
  },
  {
    id: 'boj-1343',
    num: 1343,
    title: '폴리오미노',
    category: '구현',
    difficulty: 'Silver V',
    url: 'https://www.acmicpc.net/problem/1343',
    description: '구현, 그리디 알고리즘, 문자열',
    code: `N = input()

tmp = ""
cnt = 0
flag = False

for i in range(len(N)):
    if N[i] == 'X':
        cnt += 1
        if cnt == 4:
            tmp += 'AAAA'
            cnt = 0
    else:
        if cnt == 1 or cnt ==3:
            flag = True
            break 
        elif cnt == 2:
            tmp += 'BB'
            cnt = 0
        
        tmp += '.'
        cnt = 0

if cnt == 1 or cnt == 3:
    flag = True
elif cnt == 2:
    tmp += 'BB'

if flag:
    print(-1)
else:
    print(tmp)`,
  },
  {
    id: 'boj-1417',
    num: 1417,
    title: '국회의원 선거',
    category: '구현',
    difficulty: 'Silver V',
    url: 'https://www.acmicpc.net/problem/1417',
    description: '구현, 자료 구조, 그리디 알고리즘, 시뮬레이션, 우선순위 큐',
    code: `from collections import deque

N = int(input())
M = deque([])

for _ in range(N):
    M.append(int(input()))


tmp = M.popleft()
answer = 0
while M:
    max_value = max(M)
    max_index = M.index(max_value)

    if max_value < tmp:
        break

    M[max_index] = max_value - 1
    answer += 1
    tmp += 1

print(answer)`,
  },
  {
    id: 'boj-11728',
    num: 11728,
    title: '배열 합치기',
    category: '정렬',
    difficulty: 'Silver V',
    url: 'https://www.acmicpc.net/problem/11728',
    description: '정렬, 두 포인터',
    code: `from collections import deque

n, m = map(int, input().split())

a = deque(sorted(map(int, input().split())))
b = deque(sorted(map(int, input().split())))


cnt = 0
answer = []

while len(a) > 0 and len(b) > 0:
    if a[cnt] < b[cnt]:
        answer.append(a[cnt])
        a.popleft()
    else:
        answer.append(b[cnt])
        b.popleft()

if len(a) > 0:
    for i in a:
        answer.append(i)
else:
    for i in b:
        answer.append(i)

print(*answer)`,
  },
  {
    id: 'boj-2309',
    num: 2309,
    title: '일곱 난쟁이',
    category: '브루트포스 알고리즘',
    difficulty: 'Bronze I',
    url: 'https://www.acmicpc.net/problem/2309',
    description: '브루트포스 알고리즘, 정렬',
    code: `from itertools import combinations

dwarf = []

for _ in range(9):
    dwarf.append(int(input()))



for i in list(combinations(dwarf,7)):
    if sum(i) == 100:
        print(*sorted(i), sep='\\n')
        break`,
  },
  {
    id: 'boj-3052',
    num: 3052,
    title: '나머지',
    category: '수학',
    difficulty: 'Bronze II',
    url: 'https://www.acmicpc.net/problem/3052',
    description: '수학, 집합과 맵, 사칙연산',
    code: `num = [0] * 10

for i in range(10):
  num[i] = int(input()) % 42

print(len(set(num)))`,
  },
  {
    id: 'boj-10809',
    num: 10809,
    title: '알파벳 찾기',
    category: '구현',
    difficulty: 'Bronze II',
    url: 'https://www.acmicpc.net/problem/10809',
    description: '구현, 문자열',
    code: `s = [-1] * 26
s2 = str(input())
for i in range(len(s2)):
  n = ord(s2[i]) - ord('a')

  if s[n] == -1:
    s[n] = i

print(*s)`,
  },
  {
    id: 'boj-22864',
    num: 22864,
    title: '피로도',
    category: '수학',
    difficulty: 'Bronze II',
    url: 'https://www.acmicpc.net/problem/22864',
    description: '수학, 구현, 그리디 알고리즘, 사칙연산, 시뮬레이션',
    code: `A, B, C, M = list(map(int, input().split()))

work = 0
fuck = 0

for _ in range(24):
    if fuck + A > M:
        fuck = max(0, fuck - C)
    else:
        work += B
        fuck += A

if A > M:
    print(0)
else:
    print(work)`,
  },
  {
    id: 'boj-5597',
    num: 5597,
    title: '과제 안 내신 분..?',
    category: '구현',
    difficulty: 'Bronze III',
    url: 'https://www.acmicpc.net/problem/5597',
    description: '구현',
    code: `student = [0] * 31

for i in range(28):
  n = int(input())
  student[n] = 1

for i in range(1, len(student)):
  if student[i] != 1:
    print(i)`,
  },
  {
    id: 'boj-11720',
    num: 11720,
    title: '숫자의 합',
    category: '구현',
    difficulty: 'Bronze IV',
    url: 'https://www.acmicpc.net/problem/11720',
    description: '구현, 수학, 문자열',
    code: `cnt_num = int(input())
num = str(input())
cnt = 0

for i in range(cnt_num):
  cnt += int(num[i])

print(cnt)`,
  },
];
