import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

export const configureDotEnv = () => {
	let environment = 'dev';
	if (process.env.NODE_ENV) {
		environment = process.env.NODE_ENV;
		if (environment == 'development') environment = 'dev';
	}
	dotenvExpand.expand(dotenv.config({ path: `${process.cwd()}/src/infra/env/${environment}.env` }));
};