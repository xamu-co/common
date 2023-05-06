import type { IconName } from "@fortawesome/fontawesome-common-types";

import { eFormFactoryType } from "@open-xamu-co/common-enums";

import type { iSelectOption } from "./input";

export interface iInvalidInput {
	name: string;
	invalidValue: any;
}

/**
 * Form Values to be send
 */
export interface iFormValues<T extends Record<string, any> = Record<string, any>> {
	values: T;
	invalidInputs: iInvalidInput[];
}

/**
 * Sended form values
 */
export interface iFormResponse<R extends any = any, RWE extends boolean = boolean> {
	response: R;
	invalidInputs: iInvalidInput[];
	/**
	 * If the request had any error (validation/request itself).
	 */
	withErrors: RWE;
	/**
	 * If the request had any error.
	 */
	requestHadErrors: boolean;
	/**
	 * If the validation had any error.
	 */
	validationHadErrors: boolean;
	/**
	 * Errors payload,
	 * 401 will be reported but not failed
	 */
	errors?: any;
}

export type tFormAutocomplete =
	| "off"
	| "on"
	| "name"
	| "honorific-prefix"
	| "given-name"
	| "additional-name"
	| "family-name"
	| "honorific-suffix"
	| "nickname"
	| "email"
	| "username"
	| "new-password"
	| "current-password"
	| "one-time-code"
	| "organization-title"
	| "organization"
	| "street-address"
	| "address-line1"
	| "address-line2"
	| "address-line3"
	| "address-level4"
	| "address-level3"
	| "address-level2"
	| "address-level1"
	| "country"
	| "country-name"
	| "postal-code"
	| "cc-name"
	| "cc-given-name"
	| "cc-additional-name"
	| "cc-family-name"
	| "cc-number"
	| "cc-exp"
	| "cc-exp-month"
	| "cc-exp-year"
	| "cc-csc"
	| "cc-type"
	| "transaction-currency"
	| "transaction-amount"
	| "language"
	| "bday"
	| "bday-day"
	| "bday-month"
	| "bday-year"
	| "sex"
	| "tel"
	| "tel-country-code"
	| "tel-national"
	| "tel-area-code"
	| "tel-local"
	| "tel-extension"
	| "impp"
	| "url";

export interface iFormIconProps {
	brand?: boolean;
	regular?: boolean;
}

export type tFormIcon = [IconName, iFormIconProps];

export interface iFormFactoryInput<T extends any = any> {
	name: string;
	/**
	 * An array of values to simplify validation
	 *
	 * @old value
	 */
	values: T[];
	required?: boolean;
	type?: eFormFactoryType;
	options?: (string | number | iSelectOption)[];
	/**
	 * Visible over the field, should describe it
	 */
	title?: string;
	/**
	 * String without the dots
	 */
	placeholder?: string;
	icon?: IconName | tFormIcon;
	autocomplete?: tFormAutocomplete;
	/**
	 * input is of type array
	 * to require a range or a fixed amount use alongside min & max
	 *
	 * Ex: { multiple: true, min:3, max:3 } would make 3 values a requirement
	 */
	multiple?: boolean;
	/**
	 * if muliple is set to true this optional value would be the required minimun amount of values
	 */
	min?: number;
	/**
	 * if muliple is set to true this optional value would be the required maximun amount of values
	 */
	max?: number;
}

export type tFormFactoryInputRecord = Record<string, iFormFactoryInput>;
