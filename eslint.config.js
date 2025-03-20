import { default as js } from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint, { configs as tsConfigs } from 'typescript-eslint';

export default tseslint.config(
  // pluginJs.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          process: 'readonly',
          console: 'readonly',
          __dirname: 'readonly', // Fixes "__dirname is not defined" if used
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // use predefined configs in installed eslint plugins
    extends: [
      // js
      js.configs.recommended,
      // ts
      ...tseslint.configs.recommended,
      // react
      react.configs.flat.recommended,
      // import
      importPlugin.flatConfigs.recommended,
      // a11y (accessibility)
      jsxA11y.flatConfigs.recommended,
      // prettier
      prettier,
      ...tsConfigs.strictTypeChecked,
    ],

    // specify used plugins
    plugins: {
      perfectionist,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      // for eslint-plugin-react to auto detect react version
      react: {
        version: 'detect',
      },
      // for eslint-plugin-import to use import alias
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    // specify the formats on which to apply the rules below
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist'],
    rules: {
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      'prettier/prettier': [
        'error',
        { endOfLine: 'auto' },
        { usePrettierrc: true },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      // '@typescript-eslint/no-unsafe-call': 'off',
      'object-shorthand': ['error', 'always'],
      'import/no-extraneous-dependencies': [
        'error',
        {
          peerDependencies: true,
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          groups: ['required-property', 'optional-property'],
        },
      ],
      'perfectionist/sort-enums': ['error'],

      'react/function-component-definition': [
        2,
        {
          namedComponents: ['arrow-function', 'function-declaration'],
          unnamedComponents: 'arrow-function',
        },
      ],

      curly: ['error', 'all'],
      'arrow-body-style': 'warn',
      'react/no-multi-comp': ['error', { ignoreStateless: false }],
      'react/no-unescaped-entities': 0,
      'react/jsx-curly-brace-presence': 'error',
      'no-underscore-dangle': ['error', { allow: ['__esModule', '__extends'] }],
      // 'import/no-unresolved': 'off',
      // 'import/extensions': 'off',
      // 'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      // 'react/prop-types': 'off',
      'jsx-a11y/alt-text': 'error',
      'react/jsx-filename-extension': [
        2,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'no-console': ['warn', { allow: ['error'] }],
      'no-warning-comments': [
        'error',
        { terms: ['todo', 'fixme', 'any other term'], location: 'anywhere' },
      ],
      camelcase: 'off',
      // 'react/destructuring-assignment': 'off',
      'react/jsx-no-target-blank': [
        'error',
        {
          allowReferrer: false,
          enforceDynamicLinks: 'always',
          warnOnSpreadAttributes: true,
          links: true,
          forms: true,
        },
      ],
      'react/button-has-type': 'error',
      'react/prefer-stateless-function': 'warn',
      // 'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'prefer-template': 'error',
      'react/no-did-update-set-state': 'warn',
      'class-methods-use-this': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      // 'react/no-array-index-key': 'off',
      'react/no-direct-mutation-state': 1,
      'no-nested-ternary': 'warn',
      'react/require-default-props': [
        'error',
        { ignoreFunctionalComponents: true },
      ],
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['state'] },
      ],
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowFunctions: true,
        },
      ],
      'import/prefer-default-export': 'warn',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/html-has-lang': ['error'],
      'jsx-a11y/img-redundant-alt': [
        2,
        {
          components: ['Image'],
          words: ['Bild', 'Foto', 'Billede'],
        },
      ],
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label'],
          labelAttributes: ['for'],
          controlComponents: ['Input'],
          depth: 4,
        },
      ],
    },
  },
);
