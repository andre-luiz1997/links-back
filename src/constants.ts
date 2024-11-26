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
}

export const JWT = {
	secret: process.env.JWT_SECRET,
	expiresIn: '1d',
	expiresInLong: '7d',
}