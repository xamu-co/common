module.exports = {
	root: true,
	parserOptions: {
		parser: "@typescript-eslint/parser",
		allowImportExportEverywhere: false,
		ecmaVersion: 2020,
		ecmaFeatures: { globalReturn: false },
	},
	extends: ["eslint:recommended"],
	plugins: ["@typescript-eslint", "prettier", "import"],
	rules: {
		// typescript
		"@typescript-eslint/no-dupe-class-members": ["error"],
		"@typescript-eslint/no-redeclare": ["error"],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				varsIgnorePattern: "^_",
				argsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
			},
		],
		"@typescript-eslint/no-use-before-define": ["error"],
		// import
		"import/no-named-as-default": "off",
		"import/no-unresolved": "error",
		// prettier
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
		// unicorn
		"unicorn/number-literal-case": "off",
		// eslint
		curly: ["error", "multi-line"],
		quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
		"arrow-parens": "off",
		"comma-dangle": "off",
		eqeqeq: ["error", "smart"],
		indent: "off",
		"no-dupe-class-members": "off",
		"no-extra-boolean-cast": "off",
		"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
		"no-redeclare": "off",
		"no-tabs": "off",
		"no-unused-vars": "off",
		"no-use-before-define": "off",
		semi: "off",
		"space-before-function-paren": "off",
		"spaced-comment": "off",
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				// always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
				alwaysTryTypes: true,
			},
		},
	},
};
