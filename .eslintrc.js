module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": [
      "error",
      {"args": "none"}
    ],
    "indent": [ // conflict with "indent"
      "off",
      2,
      {"SwitchCase": 1}
    ],
    "no-invalid-this": [
      "off"
    ],
    "react/display-name": [
      "off"
    ],
    "react/prop-types": [
      "off"
    ],
    "react/jsx-indent-props": [
      2,4
    ],
  },
  'settings': {
    'react': {
      version: '999.999.999'
    }
  }
};
