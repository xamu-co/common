/**
 * Strips unsafe html
 *
 * @param {string} s
 * @returns {string}
 */
export function stripScripts(s: string) {
	const div = document.createElement("div");
	div.innerHTML = s;
	const scripts = div.getElementsByTagName("script");
	let i = scripts.length;
	while (i--) {
		scripts[i].parentNode!.removeChild(scripts[i]);
	}
	return div.innerHTML;
}

/**
 * Scroll page to given element
 *
 * @export
 * @param {string} section Id del elemento
 */
export function scrollTo(section: string) {
	if (section === "#" || section === "") {
		window.scrollTo({ top: 0, behavior: "smooth" });
	} else {
		const element = document.getElementById(section.replace(/#/gi, ""));
		const position = window.pageYOffset + element!.getBoundingClientRect().top - 80;
		if (position !== 0) {
			window.scrollTo({ top: position, behavior: "smooth" });
		}
	}
}

/**
 * Fallback - copy the given string to the user clipboard
 *
 * @export
 * @param {string} str a normal string
 */
export function oldStrToClipboard(str: string) {
	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
}

/**
 * Copy the given string to the user clipboard
 * This uses the more modern clipboard api, but using the previos function as a fallback
 *
 * @export
 * @param {string} str a normal string
 */
export function srtToClipboard(str: string) {
	return new Promise<boolean>((resolve) => {
		if ("clipboard" in navigator) {
			navigator.clipboard
				.writeText(str)
				.then(() => {
					// Copiado moderno
					resolve(true);
				})
				.catch((error) => {
					// This can happen if the user denies clipboard permissions:
					// eslint-disable-next-line no-console
					console.log("Could not copy text", error);
					// reject(new Error("Could not copy text"));
					resolve(false);
				});
		} else if (oldStrToClipboard(str) !== null) {
			// Copiado con fallback
			resolve(true);
		}
	});
}

/**
 * Share content using the share api
 * Fallsback to clipboard copy
 *
 * @export
 * @param {string} title A short title
 * @param {string} text A good description
 * @param {string} url Valid web url
 */
export function shareThis(title: string, text: string, url: string) {
	return new Promise<boolean>((resolve) => {
		if ("share" in navigator) {
			// share using api
			navigator
				.share({
					title,
					text,
					url,
				})
				.then(() => {
					// eslint-disable-next-line no-console
					console.log("Successful share");
					resolve(true);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.log("Error sharing or cancelled", error);
					// reject(new Error("Error sharing or cancelled"));
					resolve(false);
				});
		} else {
			// copiar url al clipboard
			resolve(srtToClipboard(url));
		}
	});
}

/**
 * Toggles the dropdown component
 * It requires a toggler and a dropdown to be preset in th layout
 * TODO: return a promise instead
 *
 * @param {object} tEvent the initial click event
 * @param {boolean} shouldHide should hide (on mobile for example)
 */
export function toggleToggleableElement(
	tEvent: Event,
	shouldHide: boolean = false,
	type: string = "dropdown"
) {
	const tTrigger = (tEvent.target as HTMLElement).closest(`.toggle--${type}`);
	const tTriggerButton = tTrigger?.querySelector("[type=button]");
	const tContainer = tTrigger?.nextElementSibling;
	/**
	 * wheter or not the toggleable element is active
	 */
	const isActive = !!tTrigger?.classList.contains("is--active");
	const show = shouldHide && !isActive;

	/**
	 * close & unset listener
	 */
	function close(listener: (e: Event) => void) {
		tTrigger?.classList.remove("is--active");
		tTriggerButton?.classList.remove("is--active");
		document.removeEventListener("click", listener, true);
	}

	/**
	 * click outside listener
	 */
	function clickOutside(clickEvent: Event) {
		const clickTarget = clickEvent.target as HTMLElement;
		const clickContainer = clickTarget.closest(`.${type}`);
		if (!!clickTarget.closest(`.toggle--${type}.is--active`)) return;
		if (
			!clickContainer ||
			(clickContainer !== tContainer && !tContainer?.contains(clickContainer)) ||
			!!clickTarget.closest("[href]")
		) {
			close(clickOutside);
		}
	}

	return function (callback?: (active: boolean) => void) {
		callback?.(isActive);
		(document.activeElement as HTMLElement)!.blur();
		if (show) {
			// open & set listener
			tTrigger?.classList.add("is--active");
			tTriggerButton?.classList.add("is--active");
			document.addEventListener("click", clickOutside, true);
		} else {
			close(clickOutside);
		}
	};
}

/**
 * Device is touch device
 */
export function isTouchDevice(): boolean {
	const nav: Navigator & { msMaxTouchPoints?: any } = navigator;
	return "ontouchstart" in window || nav.maxTouchPoints > 0 || nav?.msMaxTouchPoints > 0;
}
