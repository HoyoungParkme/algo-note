/**
 * 모듈명: SearchPalette
 * 파일 경로: src/components/layout/SearchPalette.tsx
 * 목적: Cmd+K 검색 모달. Fuse.js 결과를 표시하고 클릭 시 해당 토픽으로 스크롤
 */

import { useEffect, useRef, useState } from 'react';
import type Fuse from 'fuse.js';
import type { SearchHit } from '@/lib/search';
import { useStore } from '@/store/useStore';

interface Props {
  open: boolean;
  onClose: () => void;
  fuse: Fuse<SearchHit>;
}

export function SearchPalette({ open, onClose, fuse }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const setActiveTab = useStore((s) => s.setActiveTab);

  // open 시 query 리셋. 포커스는 input의 autoFocus 속성으로 처리.
  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const results = query.trim() === '' ? [] : fuse.search(query).slice(0, 12);

  const handleSelect = (hit: SearchHit) => {
    setActiveTab(hit.kind);
    onClose();
    // 탭 전환 직후 DOM에 카드가 마운트되도록 한 프레임 대기
    requestAnimationFrame(() => {
      document
        .getElementById(`sec-${hit.topic.id}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="검색"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <span aria-hidden="true" className="text-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="토픽, 비유, 키워드로 검색…"
            className="flex-1 bg-transparent outline-none text-[0.95rem]"
            style={{ color: 'var(--text)' }}
            autoFocus
          />
          <kbd
            className="text-[0.7rem] px-2 py-0.5 rounded font-mono"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' && (
            <p
              className="text-center py-8 text-[0.85rem]"
              style={{ color: 'var(--text-muted)' }}
            >
              검색어를 입력하세요. 예: "다익", "큐", "최단거리"
            </p>
          )}
          {query.trim() !== '' && results.length === 0 && (
            <p
              className="text-center py-8 text-[0.85rem]"
              style={{ color: 'var(--text-muted)' }}
            >
              일치하는 토픽이 없습니다.
            </p>
          )}
          {results.map(({ item }) => (
            <button
              key={`${item.kind}-${item.topic.id}`}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all hover:brightness-110"
              style={{ background: 'transparent' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--surface)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              <span
                className="font-mono text-[0.7rem] px-2 py-0.5 rounded shrink-0"
                style={{
                  background:
                    item.kind === 'algo'
                      ? 'rgb(167 139 250 / 0.15)'
                      : 'rgb(244 114 182 / 0.15)',
                  color: item.kind === 'algo' ? '#a78bfa' : '#f472b6',
                }}
              >
                {item.kind === 'algo' ? `${item.topic.num}` : 'SKILL'}
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className="font-bold text-[0.9rem] truncate"
                  style={{ color: 'var(--text)' }}
                >
                  {item.topic.title}
                </div>
                <div
                  className="text-[0.78rem] truncate"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.topic.analogy}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
