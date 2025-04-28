// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'src/index.html', 'src/styles.css', 'src/styles.scss'],
  },
  ...tseslint.config(
    {
      files: ['**/*.ts'],
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
        ...angular.configs.tsRecommended,
      ],
      plugins: {
        prettier: prettierPlugin,
      },
      rules: {
        'prettier/prettier': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
      },
      processor: angular.processInlineTemplates,
    },
    {
      files: ['**/*.html'],
      extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
      plugins: {
        prettier: prettierPlugin,
      },
      rules: {
        'prettier/prettier': 'error',
      },
    }
  ),
];
