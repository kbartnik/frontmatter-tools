import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            }
        },
        plugins: {
            '@typescript-eslint': ts,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...ts.configs.recommended.rules,

            // Custom rules
            'no-console': 'warn',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'only-multiline'],

            // Allow any for now
            '@typescript-eslint/no-explicit-any': 'off',

            // Prefer ts-expect-error
            '@typescript-eslint/ban-ts-comment': [
                'error',
                {
                    'ts-expect-error': false
                }
            ],
        }
    }
];