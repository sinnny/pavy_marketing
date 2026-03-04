import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@page-chatbot/i18n': resolve(__dirname, '../../packages/i18n/src/index.ts'),
    },
  },
  server: {
    host: true,
    port: 4273,
    strictPort: true,
    fs: {
      // 프로젝트 루트 바깥의 packages 폴더 접근 허용
      allow: ['..', '../../packages'],
    },
    watch: {
      // 워크스페이스 내의 패키지 수정사항을 즉시 감지하도록 설정
      ignored: ['!**/packages/i18n/src/locales/**'],
      usePolling: true, // 파일 시스템 이벤트가 전달되지 않는 경우를 대비해 폴링 방식 사용 (확실한 방법)
    },
  },
  optimizeDeps: {
    exclude: ['@page-chatbot/i18n'],
  },
});
