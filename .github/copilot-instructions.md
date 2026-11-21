# Copilot Instructions for dash-games

## Project Overview

**Data Literacy Game Design Lab** – An experimental React project to develop interactive, game-based data literacy learning for education professionals (teachers, school leaders, education administrators).

**Core Mission**: Create engaging game-based challenges that teach data literacy skills—interpretation, pattern recognition, critical questioning, understanding context, distinguishing correlation from causation, and drawing sound conclusions.

**Key Philosophy**: 
- **Learning First** – Each game mechanic serves a learning goal
- **Interaction over Decoration** – Interactivity supports learning, not just looks
- **Safe Exploration** – Errors are part of learning; players should experiment and revise conclusions
- **Professional Context** – Scenarios reflect realistic school and education administration situations

The project uses **React 19 + TypeScript** with **Vite** for rapid development. It includes **Module Federation** via `@originjs/vite-plugin-federation` for potential deployment as a Micro Frontend (MFE), maintaining component isolation through scoped CSS and prefixed design tokens.

## Build, Test & Lint Commands

### Development
```bash
yarn dev          # Start Vite dev server on port 5174 with HMR
yarn preview      # Build and preview production build locally
```

### Production Build
```bash
yarn build        # TypeScript type-check + Vite bundle (outputs to dist/)
```

### Linting & Code Quality
```bash
yarn lint         # Run ESLint across all .ts/.tsx files
```

**Testing Strategy** (from Definition of Done):
- Unit tests with **Vitest** (dev dependency available)
- E2E tests with **Playwright** (dev dependency available)
- Currently implementing first challenges; testing structure to be established as project scales

## High-Level Architecture

### Core Structure

**Directory Layout** (following proposed structure from README):
```
src/
├── components/          # Shared UI components (GameLayout, EvidenceCard, DropZone, FeedbackPanel, ProgressIndicator)
├── challenges/          # Challenge implementations, organized by game mechanic
│   ├── missing-context/     # Phase 1: Evidence Collection / Drag & Drop
│   ├── hidden-evidence/     # Phase 2: Progressive Disclosure
│   ├── wrong-decision/      # Phase 3: Branching Scenarios
│   └── different-perspectives/  # Phase 4: Role Playing
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores for game state
├── types/              # Shared TypeScript types & interfaces
├── utils/              # Utility functions & helpers
├── App.tsx
└── main.tsx
```

**Entry Point**: `src/main.tsx` → renders `<App />` to DOM root
**App Root**: `src/App.tsx` - MFE-wrapped container or challenge router
**Current Implementation**: 
  - `src/EvidenceGame.jsx` - Phase 1 prototype (drag-and-drop evidence collection)
  - Demonstrates core game mechanic and state management pattern

### Module Federation Setup
- **Config**: `vite.config.ts`
- **Exposed**: `./App` mapped to `src/App.tsx` as the remote entry point
- **Remote Entry**: `remoteEntry.js` (generated at build time)
- **Base Path**: `/react-mfe-template/` (for GitHub Pages deployment)
- **Shared Dependencies**: `react`, `react-dom` (singleton shared with host app)
- **Port**: 5174 (dev & preview)

### Key Dependencies
- **React 19.2** - UI framework
- **Vite 8** - Build tool and dev server
- **TypeScript** - Type safety (target: `esnext`)
- **@dnd-kit/react** - Drag-and-drop primitives (Phase 1 & onward)
- **motion** (Framer Motion) - Animations and layout transitions (all phases)
- **lucide-react** - Icon library
- **Zustand** - Lightweight state management for game state (future phases)
- **Vitest** (dev) - Unit testing framework
- **Playwright** (dev) - E2E testing framework
- **Zod** (dev) - Validation of challenge data schemas
- **XState** (optional future) - State machines for complex branching scenarios (Phase 3+)
- **Recharts / Nivo / React Flow** (optional future) - Data visualization libraries
- **ESLint** - Code linting (flat config style)

## Styling & CSS Architecture

### Design System
All CSS uses **MFE-scoped custom properties** to prevent conflicts in multi-MFE environments:
- Prefix: `--mfe-template-*` (e.g., `--mfe-template-text`, `--mfe-template-accent`)
- Defined in `src/index.css` (`:root` scope)
- Semantic tokens: `--mfe-template-heading`, `--mfe-template-surface`, `--mfe-template-elevated`, etc.
- Light and dark mode support via `@media (prefers-color-scheme: dark)`

### Class Naming (BEM-like)
- **Block**: `.mfe-template` (root wrapper class)
- **Elements**: `.mfe-template__element` (e.g., `.mfe-template__button`, `.mfe-template__center`)
- **Prevents collisions** when multiple MFEs are mounted on the same page
- Never use generic IDs like `#center` or `#docs` — use scoped classes instead

### Modern CSS Features
- `clamp()` for fluid typography (responsive font sizes without media queries)
- CSS Grid/Flexbox for layouts
- Transitions: `0.15s ease` (consistent duration across components)
- Focus states use ring-style outlines
- Box model: `* { box-sizing: border-box }` scoped to `.mfe-template`

**Example**:
```css
.mfe-template__button {
  color: var(--mfe-template-text);
  background: var(--mfe-template-accent);
  border: 2px solid var(--mfe-template-accent-border);
  border-radius: 8px;
  transition: all 0.15s ease;
}

.mfe-template__button:hover {
  background: var(--mfe-template-accent-soft);
}
```

## Game Design Roadmap

The project develops game mechanics **incrementally** through small, working prototypes. Each phase introduces a core mechanic and validates its educational value.

### Phase 1 – Drag & Drop / Evidence Collection (Current)
**Challenge: The Missing Context**

**Learning Goal**: Understand why data without context cannot be meaningfully compared or interpreted.

**Scenario**: Two schools show different dropout rates. Players discover which contextual factors are relevant for fair comparison (student structure, collection period, definitions, etc.).

**Game Mechanic**: Drag and drop information cards into category zones (relevant/not relevant), receive immediate feedback.

**Technology**: React + @dnd-kit/react + Motion

**Implemented in**: `src/EvidenceGame.jsx`

---

### Phase 2 – Progressive Disclosure
**Challenge: The Hidden Evidence**

**Learning Goal**: Understand how additional information changes interpretation of education data.

**Mechanic**: Gradually unlock information, players make initial assessments, then discover new context that may require revising conclusions.

**Technology**: React + Motion + Zustand state management

---

### Phase 3 – Branching Scenarios
**Challenge: The Wrong Decision**

**Learning Goal**: Recognize which conclusions from education data are justified.

**Mechanic**: Players make decisions based on incomplete information, experience different scenario paths and consequences, optionally revise decisions with new data.

**Technology**: React + Zustand + XState (optional for state machines)

---

### Phase 4 – Role Playing
**Challenge: Different Perspectives**

**Learning Goal**: Understand how the same data is interpreted differently depending on role and question.

**Mechanic**: Players adopt different roles (teacher, school leader, administrator) and encounter different tasks and perspectives on identical data.

**Technology**: React + Zustand + Motion

---

### Phase 5 – Full Experience Integration
**Challenge: The Missing Context – Complete Investigation**

Combines all prior mechanics into a cohesive game flow: introduction → initial assessment → discovery → evidence collection → categorization → progressive disclosure → decision → consequences → reflection.

---

### Future Challenge Ideas
- **Chart Detective** – Interpret diagrams (Visual Discovery)
- **Fact or Fiction** – Verify statements (Classification)
- **Spot the Bias** – Identify distortions (Detection)
- **Correlation or Causation** – Evaluate relationships (Investigation)
- **The Misleading Chart** – Identify misleading visualizations (Error Detection)
- **Education Escape Room** – Multi-skill puzzle/storytelling combination

## Component Development Conventions

### React Components
- **File format**: Mix of `.tsx` (TypeScript) and `.jsx` (JavaScript)
- **New challenges should use TypeScript** (`.tsx`) for type safety and maintainability
- **Hooks-first approach** – Use custom hooks in `src/hooks/` for reusable logic
- **Motion integration**: Use `motion.div` for animated elements, `AnimatePresence` for conditional reveals
- **Props structure**: Minimal props; prefer composition and context over prop drilling
- **State management**: Use Zustand for game state; `useState` for UI-only state

### Drag-and-Drop Implementation
- Uses `@dnd-kit/react` with `useDraggable` and `useDroppable` hooks
- **DragEnd handler**: Always check `event.canceled`, then inspect `event.operation.source.id` and `event.operation.target.id`
- **Accessibility**: Provide keyboard alternative and clear visual feedback
- **Pattern** (from EvidenceGame.jsx):
  ```tsx
  const { ref, isDragging } = useDraggable({ id: item.id });
  const { ref, isDropTarget } = useDroppable({ id: zone.id });
  ```

### Immediate Feedback Pattern
Every game action should provide immediate, clear feedback:
- Visual state changes (opacity, color, scale)
- Confirmation messages
- Scoring/progress updates
- Explanations of why an answer is correct/incorrect

### Localization
- **German** is the primary language (UI text, scenarios, learning objectives)
- Scenario descriptions, learning goals, and feedback in German
- Consider future i18n setup using a library like `i18next` when scaling to multiple languages
- Currently: Text is embedded in components or in `data/` files

## TypeScript & ESLint Configuration

### TypeScript
- **Config files**:
  - `tsconfig.json` - References to app and node configs
  - `tsconfig.app.json` - Application-specific settings
  - `tsconfig.node.json` - Vite and config file settings
- **Target**: `esnext` (Vite handles transpilation)
- **Strict mode**: Recommended for new `.tsx` files

### ESLint
- **Config**: `eslint.config.js` (flat config style, ESLint 9+)
- **Extends**: 
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `react-hooks` rules
  - `react-refresh` plugin
- **Environment**: Browser globals, ES2020 syntax
- **Build output ignored**: `dist/` directory
- **Run before commit**: `yarn lint` should pass

## Deployment & GitHub Actions

### GitHub Pages Deployment
- **Workflow**: `.github/workflows/deploy.yml` (triggers on push to `main`)
- **Build steps**:
  1. Checkout code
  2. Setup Node 22 + Yarn cache
  3. Install dependencies (frozen lockfile)
  4. Build: `yarn build` (outputs to `dist/`)
  5. Configure GitHub Pages artifact
  6. Deploy to GitHub Pages
- **Base path**: `/react-mfe-template/` (adjust in `vite.config.ts` if repo name changes)

### Local Build Verification
```bash
yarn build      # Verify TypeScript + Vite output
yarn preview    # Test production build locally on http://localhost:5174
```

## Key Files & Their Purposes

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite + React + Module Federation config; adjust `base` for GH Pages repo path |
| `src/main.tsx` | React DOM render entry point |
| `src/App.tsx` | MFE root component; .mfe-template wrapper + scoped styles |
| `src/EvidenceGame.jsx` | Interactive drag-and-drop game component |
| `src/index.css` | Global CSS custom properties + semantic tokens |
| `eslint.config.js` | Flat ESLint config (ESLint 9+) |
| `tsconfig.*.json` | TypeScript configurations |
| `.github/workflows/deploy.yml` | Automated GitHub Pages deployment |

## Common Development Tasks

### Add a New Challenge
1. Create folder in `src/challenges/[challenge-name]/`
2. Set up structure:
   - `[ChallengeName].tsx` - Main component
   - `components/` - UI components specific to this challenge
   - `data/` - Scenario data and learning objectives
   - `logic/` - Game rules and scoring
   - `types.ts` - TypeScript interfaces
3. Use `GameLayout` component for consistent structure
4. Use `--mfe-template-*` CSS variables for styling
5. Implement immediate feedback (see "Immediate Feedback Pattern" above)
6. Test with the Definition of Done checklist (see below)

### Add a New Shared Component
1. Create in `src/components/[ComponentName]/`
2. Follow the established prop and state patterns
3. Ensure it's reusable across multiple challenges
4. Document with TypeScript interfaces

### Update Styling
1. Add new custom properties to `:root` in `src/index.css` with `--mfe-template-` prefix
2. Use `.mfe-template__[element]` class naming
3. Test in both light and dark modes
4. Verify no generic IDs are used (all should be scoped classes)

### Implement Game State with Zustand
1. Create store in `src/stores/[storeName].ts`
2. Keep store logic separate from components
3. Use for game state; keep UI state in React with `useState`

## Performance & Best Practices

- **Code splitting**: CSS is NOT split (`cssCodeSplit: false` in Vite config); kept as single bundle for MFE
- **Minification**: Disabled in build (`minify: false`); enables easier debugging of published MFE
- **Shared dependencies**: React and ReactDOM are singletons; upgrades on host app side only
- **CSS scoping**: Critical for MFE isolation; never use global class names
- **Motion performance**: `@dnd-kit` and `framer-motion` handle their own optimization

## Design Principles for Challenges

Every challenge implementation should follow these core principles:

### Learning First
Each game mechanic must serve a concrete learning objective. Every interaction should teach something specific about data literacy.

### Interaction over Decoration
Interactivity supports and reinforces learning. Visual polish is secondary to clear, meaningful player interactions.

### Immediate Feedback
Players need to understand why their answer is correct or incorrect. Provide explanations, not just scores.

### Safe Exploration
Errors are part of learning. Players should be encouraged to experiment, make mistakes, and revise their conclusions without penalty or shame.

### Professional Context
Scenarios reflect realistic situations from schools and education organizations. Use authentic data, terminology, and decision-making contexts.

### Accessibility
- Keyboard navigation must work alongside drag-and-drop
- Sufficient color contrast
- Clear, understandable language
- Mobile responsiveness
- Alternative interaction methods for all core mechanics

## Definition of Done for a Challenge

A challenge is considered complete when:

- [ ] The learning objective is clearly defined in the challenge documentation
- [ ] The scenario has a realistic education/school context
- [ ] At least one active game mechanic is implemented and functional
- [ ] Interactions work reliably (no edge cases or glitches)
- [ ] Feedback and educational explanations are integrated
- [ ] A complete game flow from start to finish is playable
- [ ] The challenge works on mobile devices
- [ ] All core interactions are keyboard-accessible
- [ ] The learning effect is demonstrable (player can articulate what they learned)
- [ ] Code is linted and follows the project conventions
- [ ] Test coverage exists for game logic (if tests are implemented)
