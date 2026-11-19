import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      eslintReact.configs['recommended-typescript'],
    ],
    plugins: {
      '@stylistic': stylistic,
      'jsx-a11y-x': jsxA11y,
      perfectionist,
    },
    rules: {
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      'perfectionist/sort-interfaces': [
        'error',
        {
          groups: ['required-property', 'optional-property'],
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          groups: ['required-property', 'optional-property'],
        },
      ],
      'perfectionist/sort-enums': 'error',

      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
          exceptions: ['-'],
        },
      ],
      'react-refresh/only-export-components': 'warn',
      'object-shorthand': ['error', 'always'],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'arrow-body-style': 'warn',
      'no-nested-ternary': 'warn',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

      '@eslint-react/no-duplicate-key': 'error',
      '@eslint-react/dom-no-missing-button-type': 'error',
      '@eslint-react/jsx-no-useless-fragment': 'error',
      '@eslint-react/no-unused-props': 'error',
      '@eslint-react/dom-no-unsafe-target-blank': 'error',
      '@eslint-react/naming-convention-id-name': 'off',

      '@eslint-react/exhaustive-deps': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/set-state-in-effect': 'off',

      '@stylistic/jsx-self-closing-comp': 'error',
      '@stylistic/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],

      'no-underscore-dangle': ['error', { allow: ['__esModule', '__extends'] }],
      'no-console': ['warn', { allow: ['error'] }],
      'no-warning-comments': [
        'error',
        { terms: ['todo', 'fixme'], location: 'anywhere' },
      ],
      'prefer-template': 'error',
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['state'] },
      ],

      'jsx-a11y-x/alt-text': 'error',
      'jsx-a11y-x/html-has-lang': 'error',
      'jsx-a11y-x/aria-role': 'error',
      'jsx-a11y-x/aria-unsupported-elements': 'error',
      'jsx-a11y-x/no-aria-hidden-on-focusable': 'error',
      'jsx-a11y-x/heading-has-content': 'error',
      'jsx-a11y-x/no-distracting-elements': 'error',
      'jsx-a11y-x/no-interactive-element-to-noninteractive-role': 'error',
      'jsx-a11y-x/no-noninteractive-tabindex': 'error',
      'jsx-a11y-x/role-has-required-aria-props': 'error',
      'jsx-a11y-x/no-redundant-roles': 'error',
      'jsx-a11y-x/role-supports-aria-props': 'error',
      'jsx-a11y-x/scope': 'error',
      'jsx-a11y-x/tabindex-no-positive': 'error',
      'jsx-a11y-x/anchor-has-content': [
        'error',
        {
          components: ['Anchor'],
        },
      ],
      'jsx-a11y-x/img-redundant-alt': [
        'error',
        {
          components: ['Image'],
          words: ['Bild', 'Foto', 'Billede'],
        },
      ],
      'jsx-a11y-x/no-autofocus': 'off',
      'jsx-a11y-x/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label'],
          labelAttributes: ['htmlFor'],
          controlComponents: ['Input'],
          depth: 4,
        },
      ],
    },
  },
  {
    files: ['src/components/skeleton/**/*.tsx'],
    rules: {
      '@eslint-react/no-array-index-key': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      'no-nested-ternary': 'warn',
      curly: ['error', 'all'],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['vite.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  prettier,
);
