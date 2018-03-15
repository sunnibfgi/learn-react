module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["standard"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],

    "rules": {
        "no-multiple-empty-lines": [2, {
            "max": 2
        }],
        "eqeqeq": 2,
        "spaced-comment": ["error", "always"],
        "no-else-return": 2,
        "camelcase": 0,
        "comma-dangle": 2,
        "no-multi-spaces": 2,
        "no-unused-vars": 2,
        "dot-notation": 2,
        "no-shadow": 2,
        "strict": 0,
        "rest-spread-spacing": "error",
        "semi": [2, "always"],
        "quotes": [2, "single", "avoid-escape"],
        "no-dupe-keys": 2,
        "no-return-assign": 2,
        "no-underscore-dangle": 0,
        "no-undef": 2,
        "eol-last": 2,
        "space-before-function-paren": [0, "always"],
        "no-unused-vars": ["error", {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": false
        }],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": ["error"]
    }
};