import { configureDotEnv } from "@shared/functions";

configureDotEnv();

export enum ProvidersEnum {
	EXAMTYPES = 'EXAMTYPES',
	REFERENCEVALUES = 'REFERENCEVALUES',
	RESULTS = 'RESULTS',
	USERS = 'USERS',
	LABS = 'LABS',
	EXAMS = 'EXAMS',
	AUTH = 'AUTH',
	ROLES = 'ROLES',
}

export enum SettingsEnum {
	DASHBOARD_INDICATORS = 'DASHBOARD_INDICATORS',
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
	}
]