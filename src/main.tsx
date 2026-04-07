/**
 * 모듈명: main
 * 파일 경로: src/main.tsx
 * 목적: React 진입점. App을 #root에 마운트하고 globals.css 로드
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
