/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  'plugins': ['jest'],
  'env': {
    'jest': true
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
    // 'etc/no-commented-out-code': 'warn',
    'no-extra-boolean-cast': 0,
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
      },
    ],
    'vue/custom-event-name-casing': [
      'error',
      'camelCase',
      {
        ignores: [],
      },
    ],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'name',
          'components',
          'inheritAttrs',
          'props',
          'emits',
          'setup',
        ],
      },
    ],
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true,
      },
    ],
    'vue/prefer-true-attribute-shorthand': ['error'],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/no-v-html': 'off',
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    // 'vue-scoped-css/enforce-style-type': ['error', { allows: ['scoped'] }],
    // 'import/order': [
    //   'error',
    //   {
    //     groups: [
    //       'builtin',
    //       'external',
    //       'parent',
    //       'sibling',
    //       'index',
    //       'object',
    //       'type',
    //     ],
    //     pathGroups: [
    //       {
    //         pattern: '@/**/**',
    //         group: 'parent',
    //         position: 'before',
    //       },
    //     ],
    //   },
    // ],
    "vue/multi-word-component-names": ["error", {
      "ignores": ['index']
    }],
    'arrow-body-style': ['error', 'as-needed'],
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['src/*'],
            message: 'The path must not begin with \'src\'',
          },
        ],
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'interface',
    //     format: ['PascalCase'],
    //     custom: {
    //       regex: '^I[A-Z]',
    //       match: true,
    //     },
    //   },
    // ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
}