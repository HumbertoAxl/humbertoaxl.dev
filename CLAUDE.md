# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **Bun**. Always use `bun` instead of `npm` or `yarn`.

## Commands

```bash
bun run dev        # Start Vite dev server with HMR
bun run build      # TypeScript check + Vite production build
bun run lint       # Run ESLint
bun run preview    # Preview production build locally
```

There are no tests configured in this project.

## Architecture

Personal portfolio website built with React 19, TypeScript, Vite, and Material-UI.

**Routing** (`src/App.tsx`): React Router v7 with two active routes:
- `/` → `HomePage`
- `/resume` → `ResumePage`

**Pages** (`src/pages/`): Full-page compositions. `HomePage` assembles `Hero`, `WorkExperience`, `Skills`, and `AboutMe` sections.

**Components** (`src/components/`): Section-level components. The `ui/` subdirectory holds lower-level reusable MUI wrappers (e.g., `Timeline.tsx`).

**Theme** (`src/theme.ts`): Custom MUI dark theme — primary/background color `#101729` (dark navy), white text, Inter font. Applied via `ThemeProvider` in `App.tsx`.

## Key Tech Notes

- **React Compiler** is enabled via `babel-plugin-react-compiler` in `vite.config.ts` — avoid manual `useMemo`/`useCallback` optimizations; the compiler handles them.
- MUI v7 with Emotion for styling. Use the `sx` prop or `styled()` for component-level styles.
- `tsconfig.app.json` enforces `noUnusedLocals` and `noUnusedParameters` — clean up unused imports or TypeScript checks will fail on build.
- Several components (`Skills.tsx`, `AboutMe.tsx`, `ResumePage.tsx`) are placeholders with minimal implementation.
