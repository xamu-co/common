/**
 * Allows the usage of Graphql template strings without affecting his behavior
 *
 * @param string
 * @returns {string}
 */
// export const gql = (string: TemplateStringsArray): string => {
// 	return String.raw(string).replace(/\b(?:mutation|query)\b/gi, "");
// };

/**
 * create a new formdata object
 *
 * @export
 * @param {object} object object with the payload
 * @returns {FormData} fomrdata object from object
 */
export function createFormData(object: Record<string, any>) {
	const formData = new FormData();
	for (const key in object) {
		const isFile =
			Array.isArray(object[key]) && object[key].every((entry: any) => entry instanceof File);
		if (!isFile) {
			formData.append(key, object[key]);
			continue;
		}
		// as file Input
		object[key].forEach((file: any) => formData.append(`${key}[]`, file));
	}
	return formData;
}

/**
 * create a new urlSearchParams object
 *
 * @export
 * @param {object} object object with the payload
 * @returns {URLSearchParams} urlSearchParams object from object
 */
export function createUrlSearchParams(object: Record<string, any>) {
	const urlSearchParams = new URLSearchParams();
	for (const key in object) {
		urlSearchParams.append(key, object[key]);
	}
	return urlSearchParams;
}

/**
 * promise timeout function .all + .race
 *
 * @export
 * @param {Array} promises The array of promises
 * @param {number} timeoutTime The timeout
 * @param {number} timeoutVal actual return value
 * @returns {Promise} Return a Promise.all with timeout
 */
export function raceAll(promises: PromiseLike<any>[], timeoutTime: number, timeoutVal: any = null) {
	return Promise.all(
		promises.map((p) => {
			return Promise.race([
				p,
				new Promise((resolve) => {
					window.setTimeout(resolve.bind(null, timeoutVal), timeoutTime);
				}),
			]);
		})
	);
}
