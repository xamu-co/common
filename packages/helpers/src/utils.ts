/**
 * Retorna el numero dado con formato de puntos de mil
 *
 * @export
 * @param {number} x a interger
 * @returns {string} the same interger but parsed as a dotted number
 */
export function formatAsCurrency(x: number): string {
	x = parseFloat(x.toString());
	// return parseFloat(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Return object from given error string
 * @param {string} err Error string
 * @returns {object}
 */
export function objectFromError(err: any) {
	let parsedError = JSON.parse(JSON.stringify(err?.message || err, undefined, 2));
	if (typeof parsedError === "string") {
		// TODO: find a more maintainable alternative
		["Error:", "Unauthorized:", "Forbidden resource:"].forEach(
			(str) => (parsedError = parsedError.replace(str, ""))
		);
		try {
			return JSON.parse(parsedError);
		} catch (err) {
			return {};
		}
	}
	return parsedError;
}

/**
 * Cast data to array or keep as it is
 *
 * @param value arrayLike
 * @returns {array}
 */
export function toArray<T>(value: T) {
	return Array.isArray(value) ? value : [value];
}
