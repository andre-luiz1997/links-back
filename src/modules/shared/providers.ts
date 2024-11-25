import { ExamsProvider } from '@modules/exams/entities/exams.entity';
import { ExamTypesProvider } from '@modules/examTypes/entities/examTypes.entity';
import { LabsProvider } from '@modules/labs/entities/labs.entity';
import { ReferenceValuesProvider } from '@modules/referenceValues/entities/referenceValues.entity';
import { ResultsProvider } from '@modules/results/entities/results.entity';
import { UsersProvider } from '@modules/users/entities/users.entity';
import type { Schema } from "mongoose";

export enum ProvidersEnum {
	EXAMTYPES = 'EXAMTYPES',
	REFERENCEVALUES = 'REFERENCEVALUES',
	RESULTS = 'RESULTS',
	USERS = 'USERS',
	LABS = 'LABS',
	EXAMS = 'EXAMS',
}

export interface IProvider {
  name: ProvidersEnum;
  schema: Schema;
}

export const Providers: IProvider[] = [ExamsProvider, LabsProvider, UsersProvider, ResultsProvider, ReferenceValuesProvider, ExamTypesProvider];
