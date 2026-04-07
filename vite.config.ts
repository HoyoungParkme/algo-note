import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import path from 'node:path';

// GitHub Pages 배포 URL: https://hoyoungparkme.github.io/algo-note/
// 저장소명을 변경하면 이 값을 함께 수정한다.
// dev 서버에서도 동일한 base 경로를 사용 → http://localhost:5173/algo-note/

export default defineConfig({
  base: '/algo-note/',
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkGfm,
        ],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              themes: {
                light: 'catppuccin-latte',
                dark: 'catppuccin-mocha',
              },
              defaultColor: false, // CSS 변수 기반으로 라이트/다크 자동 전환
            },
          ],
        ],
        providerImportSource: '@mdx-js/react',
      }),
    },
    react({ include: /\.(jsx|tsx|md|mdx)$/ }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
