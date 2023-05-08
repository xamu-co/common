/**
 * Given string is email or not
 *
 * @param {string} email
 * @returns boolean
 */
export function isEmail(email: string): boolean {
	const re =
		/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

/**
 * Wheter or not value is empty
 * @param value any value
 * @returns {boolean}
 */
export function notEmptyValue(value: any): boolean {
	if (Array.isArray(value) && value.length > 0) return value.every(notEmptyValue);
	if (
		(!value && value !== false && value !== 0) ||
		(Array.isArray(value) && value.length === 0)
	) {
		return false;
	}
	return true;
}
