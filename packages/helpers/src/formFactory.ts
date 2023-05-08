import { eFormFactoryType as eType } from "@open-xamu-co/common-enums";
import type { iFormFactoryInput, iFormValues, iInvalidInput } from "@open-xamu-co/common-types";

import { isEmail, notEmptyValue } from "./validation";

/**
 * check if single formFactoryInput value from values is valid
 */
export function isValidValue(value: any, input: iFormFactoryInput): boolean {
	// empty values are falsy
	if (!notEmptyValue(value)) return false;
	// field not empty, validate
	switch (input.type) {
		case eType.PHONE:
			// TODO: improve phone validation
			return value[1].toString().length >= 7;
		case eType.CELLPHONE:
			// TODO: improve cellphone validation
			return value[1].toString().length === 10;
		case eType.NEW_PASSWORD:
			return value[0] === value[1];
		case eType.EMAIL:
			return isEmail(value);
		default:
			return true;
	}
}

/**
 * Minimum ammount of formFactoryInput values
 */
export function getMinValues({ min }: iFormFactoryInput): number {
	return min || 0;
}

/**
 * Maximum ammount of formFactoryInput values
 */
export function getMaxValues(input: iFormFactoryInput): number {
	const minValue = getMinValues(input);
	// max cannot be lower than min or more than options if they exist
	const maxValue = input.options?.length || input.max || 9e9;
	return maxValue < minValue ? minValue : maxValue;
}

/**
 * check if formFactoryInput value is valid
 */
export const isValidFormFactoryValue = (
	input: iFormFactoryInput,
	ignoreRequiredParam = false
): boolean => {
	const values = input.values || [];
	if (input.multiple && values.length < getMinValues(input)) return false;
	if (input.multiple && values.length > getMaxValues(input)) return false;
	// value is valid or not
	const v = !!values.length && values.every((value) => isValidValue(value, input));
	// if empty but not required then value is truthy
	return v ? v : !values.every(notEmptyValue) && !input.required && !ignoreRequiredParam;
};

export function getInvalidsFromFormFactoryInputs(inputs: iFormFactoryInput[]): iInvalidInput[] {
	const invalidInputs: iInvalidInput[] = [];
	inputs.forEach((input) => {
		// Report as invalid if that is the case
		if (!isValidFormFactoryValue(input)) {
			invalidInputs.push({ name: input.name, invalidValue: input.values });
		}
	});
	return invalidInputs;
}

export function getValuesFromFormFactoryInputs<V extends Record<string, any> = Record<string, any>>(
	inputs: iFormFactoryInput[]
) {
	/**
	 * suffixes used on values
	 */
	function getInputSuffixes(type?: eType): [string, string] {
		switch (type) {
			case eType.ID:
				return ["Type", "Number"];
			case eType.CELLPHONE:
			case eType.PHONE:
				return ["Indicative", "Number"];
			case eType.REGIONAL_LOCATION:
				return ["Department", "City"];
			default:
				return ["", ""];
		}
	}
	const values: Record<string, any> = {};
	inputs.forEach((input) => {
		// inadecuate format, ignore
		if (
			!input.name ||
			input.values === undefined ||
			!Array.isArray(input.values) ||
			!input.values.length
		) {
			return;
		}
		input.values.forEach((value) => {
			// Avoid adding if empty unless it is required
			if (!notEmptyValue(value) && !input.required) return;
			switch (input.type) {
				// return two of two values
				case eType.ID:
				case eType.PHONE:
				case eType.CELLPHONE:
				case eType.REGIONAL_LOCATION: {
					getInputSuffixes(input.type).forEach((suffix, index) => {
						const key = input.name + suffix;
						const newValue = value[index];
						if (values[key] === undefined) return (values[key] = [newValue]);
						Array.isArray(values[key]) && values[key].push(newValue);
					});
					break;
				}
				// return one of two values
				case eType.NEW_PASSWORD: {
					const newValue = value[1];
					if (values[input.name] === undefined) return (values[input.name] = [newValue]);
					Array.isArray(values[input.name]) && values[input.name].push(newValue);
					break;
				}
				// return one of one value
				default: {
					const newValue = input.type === eType.NUMBER ? Number(value) : value;
					if (values[input.name] === undefined) return (values[input.name] = [newValue]);
					Array.isArray(values[input.name]) && values[input.name].push(newValue);
					break;
				}
			}
		});
		if (input.multiple) return;
		// Remove unnecessary arrays
		// The api expects simple data in some cases so this is a necessary step
		if (Array.isArray(values[input.name]) && values[input.name].length === 1) {
			values[input.name] = values[input.name][0];
		}
		getInputSuffixes(input.type)
			.filter((suffix) => suffix)
			.forEach((suffix) => {
				const key = input.name + suffix;
				if (Array.isArray(values[key]) && values[key].length === 1) {
					values[key] = values[key][0];
				}
			});
	});
	// TODO: improve assertion
	return <V>values;
}

/**
 * Returns the actual data object to send to the api
 */
export function getFormFactoryValues<V extends Record<string, any> = Record<string, any>>(
	inputs: V | iFormFactoryInput[]
): iFormValues<V> {
	if (!Array.isArray(inputs)) return { values: inputs, invalidInputs: [] };
	const values = getValuesFromFormFactoryInputs<V>(inputs);
	const invalidInputs = getInvalidsFromFormFactoryInputs(inputs);
	return {
		values,
		invalidInputs: invalidInputs.filter(({ name }) => values[name] !== undefined),
	};
}
