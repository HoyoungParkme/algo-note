/**
 * 모듈명: CodeBlock
 * 파일 경로: src/components/mdx/CodeBlock.tsx
 * 목적: MDX의 ``` 코드 블록(<pre>)을 wrap해서 우상단에 복사 버튼을 제공
 *       shiki rehype 플러그인이 이미 syntax highlighted html을 만들어주므로
 *       여기서는 wrapper만 추가
 */

import { useRef, useState, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
}

/** 자식 노드 트리에서 텍스트만 추출 (코드 복사용) */
function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (
    node &&
    typeof node === 'object' &&
    'props' in node &&
    (node as { props?: { children?: ReactNode } }).props
  ) {
    return extractText(
      (node as { props: { children?: ReactNode } }).props.children
    );
  }
  return '';
}

export function CodeBlock({ children, className, ...rest }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const [failed, setFailed] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? extractText(children);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // HTTPS가 아닌 환경이나 권한 거부 시
      console.warn('CodeBlock: 클립보드 복사 실패', err);
      setFailed(true);
      setTimeout(() => setFailed(false), 1500);
    }
  };

  return (
    <div className="relative group my-3">
      <pre
        ref={preRef}
        className={className}
        {...rest}
        style={{
          background: 'var(--code-bg)',
          border: '1px solid var(--code-border)',
          borderRadius: '12px',
          padding: '16px 18px',
          overflowX: 'auto',
          fontSize: '0.82rem',
          lineHeight: 1.65,
        }}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 rounded-md text-[0.7rem] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          color: copied ? '#22c55e' : failed ? '#ef4444' : 'var(--text-dim)',
        }}
        aria-label="코드 복사"
      >
        {copied ? '✓ 복사됨' : failed ? '복사 실패' : '복사'}
      </button>
    </div>
  );
}
