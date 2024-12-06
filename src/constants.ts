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

export const JWT = {
	secret: process.env.JWT_SECRET,
	ACCESS_TOKEN_EXPIRATION: '1d',
	REFRESH_TOKEN_EXPIRATION: '7d',
	REFRESH_TOKEN_MAX_AGE: 7 * 24 * 60 * 60 * 1000,
}