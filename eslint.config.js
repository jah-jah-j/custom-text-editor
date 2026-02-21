import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import { defineConfig, globalIgnores } from 'eslint/config'

const FSD_LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      boundaries,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'boundaries/elements': FSD_LAYERS.map((layer, i) => ({
        type: layer,
        pattern: `src/${layer}/*`,
        capture: ['slice'],
        priority: i,
      })),
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: 'app',      allow: FSD_LAYERS },
          { from: 'pages',    allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
          { from: 'widgets',  allow: ['widgets', 'features', 'entities', 'shared'] },
          { from: 'features', allow: ['features', 'entities', 'shared'] },
          { from: 'entities', allow: ['entities', 'shared'] },
          { from: 'shared',   allow: ['shared'] },
        ],
      }],

      'boundaries/entry-point': ['error', {
        default: 'disallow',
        rules: [
          { target: FSD_LAYERS, allow: ['index.ts', 'index.tsx'] },
        ],
      }],
    },
  },
])