/**
 * Media queries used in the project
 * @mq
 */
export enum eMQ {
	LAPTOP = "(max-width: 1080px)",
	TABLET = "(max-width: 768px)",
	MOBILE = "(max-width: 576px)",
}

/**
 * Theme colors
 * basics: should match scss theme variables.
 * should be supported everywhere.
 * @colors
 */
export const eThemeColors = {
	PRIMARY: "primary",
	PRIMARY_COMPLEMENT: "primaryComplement",
	SECONDARY: "secondary",
	SECONDARY_COMPLEMENT: "secondaryComplement",
	DANGER: "danger",
	SUCCESS: "success",
};

/**
 * Base colors
 * basics: should match scss theme variables.
 * should be supported everywhere.
 * @colors
 */
export const eBaseColors = {
	LIGHT: "light",
	DARK: "dark",
};

/**
 * Base colors
 * basics: should match scss theme variables.
 * should be supported everywhere.
 * @colors
 */
export const eColors = {
	...eThemeColors,
	...eBaseColors,
};
