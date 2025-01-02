import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as dayjs from 'dayjs';
import dayjsPtBR from 'dayjs/locale/pt-br';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { Types } from 'mongoose';

export const configureDotEnv = () => {
	let environment = 'dev';
	if (process.env.NODE_ENV) {
		environment = process.env.NODE_ENV;
		if (environment == 'development') environment = 'dev';
	}
	dotenvExpand.expand(dotenv.config({ path: `${process.cwd()}/src/infra/env/${environment}.env` }));
};

export const configureDayjs = () => {
	dayjs.locale({
		...dayjsPtBR,
		weekStart: 0,
	});
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('America/Sao_Paulo');
	return dayjs;
};
configureDayjs()
export function compareIds(a: string | Types.ObjectId, b: string | Types.ObjectId) {
	return a.toString() === b.toString();
}

export function getDateRange(
	start: Date,
	end: Date,
	type: 'days' | 'months'
): string[] {
	const startDate = dayjs(start);
	const endDate = dayjs(end);

	if (!startDate.isValid() || !endDate.isValid()) {
		throw new Error('Invalid date format');
	}

	if (startDate.isAfter(endDate)) {
		throw new Error('Start date must be before or equal to end date');
	}

	const result: string[] = [];

	if (type === 'days') {
		let current = startDate;
		while (current.isBefore(endDate) || current.isSame(endDate)) {
			result.push(current.format('YYYY-MM-DD'));
			current = current.add(1, 'day');
		}
	} else if (type === 'months') {
		let current = startDate.startOf('month');
		const endMonth = endDate.startOf('month');
		while (current.isBefore(endMonth) || current.isSame(endMonth)) {
			result.push(current.format('YYYY-MM'));
			current = current.add(1, 'month');
		}
	}

	return result;
}