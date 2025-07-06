const js = await import('@eslint/js')
const globals = await import('globals')
const parser = (await import('@typescript-eslint/parser')).default
const eslintPluginTs = await import('@typescript-eslint/eslint-plugin')
const react = await import('eslint-plugin-react')
const reactHooks = await import('eslint-plugin-react-hooks')
const reactRefresh = await import('eslint-plugin-react-refresh')
const prettier = await import('eslint-plugin-prettier')

export default [
  {
    ignores: ['dist', 'build', 'node_modules'],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs.default,
      react: react.default,
      'react-hooks': reactHooks.default,
      'react-refresh': reactRefresh.default,
      prettier: prettier.default,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs,

      // Regras @typescript-eslint
      'no-unused-vars': 'off', // Desliga a padrão
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      // React
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/react-in-jsx-scope': 'off',

      // React hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Outros
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'warn',
      'no-console': 'warn',
    },
  },
]
