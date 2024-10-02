import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.js'],
  },
  {
    ignores: ['**/dist/**'],
  },
  {
    rules: {
      'no-undef': 0,
      'no-restricted-imports': [
        2,
        {
          patterns: ['./*', '../*'],
        },
      ],
    },
  },
]
