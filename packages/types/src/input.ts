import type { IconName } from "@fortawesome/fontawesome-common-types";

export interface iSelectOption {
	value: string | number;
	alias?: string;
	selected?: boolean;
	icon?: IconName;
	placeholder?: string;
}
