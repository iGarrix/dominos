export class ThemeConfigurator {
	public static changeTheme(theme: string) {
		localStorage.setItem('theme', theme);
	}
}

export enum Themes {
	Dark = 'dark',
	Light = 'light',
}
