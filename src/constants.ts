import { configureDotEnv } from "@shared/functions";

configureDotEnv();

export const LinkConfigurationThemes = ['default', 'nature', 'ocean', 'sunset','retro','professional','bubblegum','custom'];
export type LinkConfigurationTheme = typeof LinkConfigurationThemes[number];

export enum ProvidersEnum {
	USERS = 'USERS',
	AUTH = 'AUTH',
	ROLES = 'ROLES',
	PLANS = 'PLANS',
	LINKS = 'LINKS'
}

export enum SettingsEnum {
}

export const JWT = {
	secret: process.env.JWT_SECRET,
	ACCESS_TOKEN_EXPIRATION: '1d',
	REFRESH_TOKEN_EXPIRATION: '7d',
	REFRESH_TOKEN_MAX_AGE: 7 * 24 * 60 * 60 * 1000,
}
export type IPermissions = {context: string, permissions: string[]};
export const PERMISSIONS: IPermissions[] = [
	{
		context: 'roles',
		permissions: [
			'add',
			'view',
			'edit',
			'delete',
		]
	},
	{
		context: 'users',
		permissions: [
			'add',
			'view',
			'edit',
			'delete',
		]
	},
	{
		context: 'links',
		permissions: [
			'add',
			'view',
			'edit',
			'delete',
		]
	},
]