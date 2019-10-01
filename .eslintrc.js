module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'prettier',
        'prettier/vue',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended'
    ],
    plugins: ['prettier'],
    // add your custom rules here
    rules: {
        // "vue/max-attributes-per-line": ["error", {
        //     "singleline": 5,
        //     "multiline": {
        //         "max": 1,
        //         "allowFirstLine": false
        //     }
        // }],
        // "vue/html-indent": ["error", 4, {
        //     "attribute": 1,
        //     "baseIndent": 1,
        //     "closeBracket": 0,
        //     "alignAttributesVertically": true,
        //     "ignores": []
        // }],
        // "vue/script-indent": ["error", 4, { "baseIndent": 0 }],
        // 'linebreak-style': ['error', 'unix'],

        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // singleQuote: true,
        // tabWidth: 4
    }
};
