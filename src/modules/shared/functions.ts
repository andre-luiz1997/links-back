import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { Types } from 'mongoose';

export const configureDotEnv = () => {
	let environment = 'dev';
	if (process.env.NODE_ENV) {
		environment = process.env.NODE_ENV;
		if (environment == 'development') environment = 'dev';
	}
	dotenvExpand.expand(dotenv.config({ path: `${process.cwd()}/src/infra/env/${environment}.env` }));
};

export function compareIds(a: string | Types.ObjectId, b: string | Types.ObjectId) {
	return a.toString() === b.toString();
}