/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // lines for vue eslint config
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 1,
        },
      },
    ],

    // html tag spaces
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],

    // multiple spaces in tags
    'vue/no-multi-spaces': [
      'error',
      {
        ignoreProperties: false,
      },
    ],

    // report variable definitions
    'vue/no-unused-vars': [
      'error',
      {
        ignorePattern: '^_',
      },
    ],

    // component names to be always multi-word
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [
          // name of component string for ignore
        ],
      },
    ],

    'vue/no-child-content': 'error',

    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: [
          // name of attribute  for igrnore
        ],
      },
    ],

    'vue/component-definition-name-casing': ['error', 'PascalCase'],

    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below',
      },
    ],

    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],

    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],

    'vue/html-quotes': ['error', 'double', { avoidEscape: true }],

    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // area , base , br , col , command , embed , hr , img , input , keygen , link , meta , param , source , track , wbr.
          normal: 'never', // p, h, div ...
          component: 'always', // custom components
        },
      },
    ],

    'vue/html-button-has-type': [
      'error',
      {
        button: true,
        submit: true,
        reset: true,
      },
    ],

    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        allowEmptyLines: false,
      },
    ],

    'vue/mustache-interpolation-spacing': ['error', 'always'],

    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],

    'vue/require-explicit-emits': [
      'error',
      {
        allowProps: true,
      },
    ],

    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true,
        ignore: [],
      },
    ],

    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],

    'vue/block-tag-newline': [
      'error',
      {
        singleline: 'always',
        multiline: 'always',
        maxEmptyLines: 0,
      },
    ],

    'vue/component-api-style': [
      'error',
      ['script-setup', 'composition', 'options'], // "script-setup", "composition", "composition-vue2", or "options"
    ],

    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],

    'vue/component-options-name-casing': ['error', 'PascalCase'],

    'vue/define-props-declaration': ['error', 'type-based'], // typed-base for ts if you are using js add "runtime"

    'vue/html-comment-content-newline': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'always',
      },
    ],

    'vue/no-undef-components': [
      'error',
      {
        ignorePatterns: ['app(\\-\\w+)+', 'router(\\-\\w+)+'], // ignores if your component starts with app and router
      },
    ],

    'vue/no-undef-properties': [
      'error',
      {
        ignores: ['/^\\$/'], // ignores property if starts with $
      },
    ],

    'vue/no-unused-properties': [
      'error',
      {
        groups: ['data', 'computed', 'methods', 'setup'], // if you are yousing typesciprt when recomend remove props
        deepData: true,
      },
    ],

    'vue/no-useless-mustaches': [
      'error',
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false,
      },
    ],

    'vue/no-useless-v-bind': [
      'error',
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false,
      },
    ],

    'vue/padding-line-between-blocks': ['error', 'always'],

    'vue/padding-line-between-tags': [
      'error',
      [{ blankLine: 'never', prev: '*', next: '*' }],
    ],

    'vue/padding-lines-in-component-definition': [
      'error',
      {
        betweenOptions: 'always',

        withinOption: {
          props: 'never',
          data: 'never',
          methods: 'always',
          computed: 'always',
        },

        groupSingleLineProperties: true,
      },
    ],

    'no-multi-spaces': ['error'],

    // lines for simple eslint config
    'no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
    semi: ['error', 'never'], // no ;
    quotes: ['error', 'single'], // no "
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-multiple-empty-lines': [
      'error',
      {
        // limit empty lines
        max: 2,
        maxEOF: 0,
      },
    ],
    'space-before-function-paren': ['error', 'always'], // space before "()"" in function
    'space-before-blocks': ['error', 'always'], // space before {}
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    // 'comma-dangle': ['error', 'never'],
    'max-params': ['error', 3],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: 'import',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['throw', 'return', 'function', 'debugger'],
      },
      {
        blankLine: 'always',
        prev: 'debugger',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-block-like',
      },
    ],
    'no-async-promise-executor': 0, // allows using an async function as a Promise executor.
    'no-undef': 'warn',
    'no-useless-catch': 'off', // TODO: research how to fix no-useless-catch
  },
}