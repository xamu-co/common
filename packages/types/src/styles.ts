import { eColors } from "@open-xamu-co/common-enums";

/**
 * Union of supported colors.
 * @colors
 */
export type tThemeModifier = typeof eColors[keyof typeof eColors]; // to union
export type tThemeTuple = [tThemeModifier, tThemeModifier?];
