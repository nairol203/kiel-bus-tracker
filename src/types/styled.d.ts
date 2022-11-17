import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		theme: string;
		colors: {
			background: string;
			text: string;
			card: string;
			primary: string;
			secondary: string;
			tertiary: string;
			buttonHover: string;
			error: string;
		};
		mobile: {
			threshold: string;
		};
		navBarHeight: string;
		footerHeight: string;
	}
}
