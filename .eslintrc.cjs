module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        // Disables the react-refresh rule that only allows component exports
        'react-refresh/only-export-components': 'off'

        // You can re-enable it with the constant export option if needed
        // 'react-refresh/only-export-components': [
        //     'warn',
        //     { allowConstantExport: true }
        // ]
    }
};
