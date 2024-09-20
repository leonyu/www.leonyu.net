// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintJest from 'eslint-plugin-jest';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  { plugins: { jest: eslintJest } }
);