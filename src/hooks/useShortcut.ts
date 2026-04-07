/**
 * 모듈명: useShortcut
 * 파일 경로: src/hooks/useShortcut.ts
 * 목적: 글로벌 키보드 단축키 등록 (Cmd+K, Ctrl+K 등)
 */

import { useEffect } from 'react';

interface Options {
  key: string; // 예: 'k'
  meta?: boolean; // Cmd / Ctrl
  shift?: boolean;
  preventDefault?: boolean;
}

/** 글로벌 단축키 핸들러를 등록한다. */
export function useShortcut(options: Options, handler: () => void): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const metaPressed = options.meta ? e.metaKey || e.ctrlKey : true;
      const shiftPressed = options.shift ? e.shiftKey : true;
      if (
        e.key.toLowerCase() === options.key.toLowerCase() &&
        metaPressed &&
        shiftPressed
      ) {
        if (options.preventDefault !== false) e.preventDefault();
        handler();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [options.key, options.meta, options.shift, options.preventDefault, handler]);
}
