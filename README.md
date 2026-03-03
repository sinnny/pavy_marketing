# Pavy Marketing Repository

Pavy.ai의 마케팅 관련 웹사이트 및 세일즈 덱(Sales Deck)을 관리하기 위한 모노레포(Monorepo)입니다. 이 저장소는 `pnpm`과 `Turborepo`를 사용하여 여러 애플리케이션과 패키지를 효율적으로 관리합니다.

## 📦 프로젝트 구조

이 프로젝트는 다음과 같은 앱과 공유 패키지로 구성되어 있습니다.

### Apps
- **`apps/site`**: Pavy.ai 공식 마케팅 사이트 (랜딩 페이지 등)
- **`apps/sales-deck`**: Pavy.ai 세일즈 및 프레젠테이션을 위한 웹 기반 덱(Deck)

### Packages (공유 패키지)
- **`packages/ui`**: 공통 UI 컴포넌트
- **`packages/utils`**: 공용 유틸리티 함수
- **`packages/types`**: TypeScript 타입 정의 (`user`, `auth`, `tenant`, `billing` 등)
- **`packages/constants`**: 공통 상수 (에러 코드, 플랜, 역할 등)
- **`packages/i18n`**: 다국어 번역 설정

### Configs (공유 설정)
- **`configs/eslint`**: ESLint 기본 및 React 설정
- **`configs/tailwind`**: Tailwind CSS 프리셋
- **`configs/tsconfig`**: TypeScript 기본, React, 라이브러리 설정

## 🚀 시작하기

### 1. 의존성 설치

루트 디렉토리에서 아래 명령어를 실행하여 모든 패키지의 의존성을 설치합니다.

```bash
pnpm install
```

### 2. 개발 서버 실행

필요에 따라 개별 앱을 실행하거나 전체를 동시에 실행할 수 있습니다.

- **마케팅 사이트 실행**
  ```bash
  pnpm dev:site
  ```
- **세일즈 덱 실행**
  ```bash
  pnpm dev:deck
  ```
- **모든 앱 동시 실행**
  ```bash
  pnpm dev:all
  ```

## 🛠️ 주요 스크립트 명령어

루트 디렉토리에서 실행 가능한 주요 명령어입니다.

- `pnpm build`: 모든 앱과 패키지를 빌드합니다.
- `pnpm lint`: 전체 프로젝트의 린트를 검사합니다.
- `pnpm typecheck`: TypeScript 타입 검사를 수행합니다.
- `pnpm format`: Prettier를 사용하여 코드 포맷팅을 적용합니다.

## ⚙️ 기술 스택

- **패키지 매니저**: [pnpm](https://pnpm.io/)
- **빌드 시스템**: [Turborepo](https://turbo.build/)
- **프론트엔드**: React, Vite
- **스타일링**: Tailwind CSS
- **언어**: TypeScript
