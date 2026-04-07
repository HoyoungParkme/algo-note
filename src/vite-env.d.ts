/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { Frontmatter } from './lib/types';
  export const frontmatter: Frontmatter;
  const Component: ComponentType;
  export default Component;
}
