module.exports = {
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "import/no-extraneous-dependencies": [
      2,
      { devDependencies: ["**/test.tsx", "**/test.ts"] },
    ],
    "camelcase": "off",
    "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
    "@typescript-eslint/indent": [2, 2],
    "@typescript-eslint/no-explicit-any": 0,
    "comma-dangle": ["error", "never"],
    "import/prefer-default-export": "off",
    "no-console": "off",
    "max-len": 'off',
    "arrow-parens": ["error", "as-needed"],
    "no-restricted-syntax": ["error", "never"], // For loops should be allowed as we aren't targeting unknown browser envs
    "no-await-in-loop": "off", // Developer should have discression of where/how async behaviour is handled on a case by case basis
    '@typescript-eslint/no-non-null-assertion': 0, // None null assertions should be allowed where sufficient checks have been carried out
    "no-underscore-dangle": 0,
    "import/extensions": ["error", "ignorePackages", {
      "ts": "never",
      "tsx": "never",
      "js": "never",
      "jsx": "never",
      "mjs": "never",
      "json": 0
    }]
  },
  overrides: [
    {
      "files": ["{src,bin,lib}/**/*.test.ts"],
      "extends": ["plugin:jest/recommended"],
      "env": {
        "jest": true
      },
      "rules": {
        "import/no-extraneous-dependencies": "off", // Dev-dependencies used for 
        "@typescript-eslint/no-var-requires": 0, // Requires used for spies
        "@typescript-eslint/explicit-function-return-type": 0, // Explicit return types not required for test suites
        "@typescript-eslint/no-explicit-any": 0, // We want to be able to force assign types where partial mocks are required
        'global-require': 0, // We want to be able to require in line 
        'no-throw-literal': 0, // Required to mock AWS throws
        "no-empty": 0
      }
    },
    {
      "files": ['seeder/**.ts'],
      "rules": {
        "import/no-extraneous-dependencies": "off", // Dev dependencies needed as is a dev script
      }
    },
    {
      "files": ['cypress/**/*.ts'],
      "rules": {
        "import/no-extraneous-dependencies": "off", // Dev dependencies needed as is a dev script
        "no-undef": "off", // Needed to quiet cypress globals
        "arrow-body-style": 'off' // Cypress' method chaining will throw an error if a sync function is returned and this enforces returns on one line functions
      }
    }
  ]
};
