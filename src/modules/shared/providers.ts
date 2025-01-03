import { RolesSchema } from '@modules/roles/entities/roles.entity';
import { ExamsSchema } from '@modules/exams/entities/exams.entity';
import { ExamTypesSchema } from '@modules/examTypes/entities/examTypes.entity';
import { LabsSchema } from '@modules/labs/entities/labs.entity';
import { ReferenceValuesSchema } from '@modules/referenceValues/entities/referenceValues.entity';
import { UsersSchema } from '@modules/users/entities/users.entity';
import type { Schema } from "mongoose";
import { ProvidersEnum } from 'src/constants';
import { HealthIndicatorsSchema } from '@modules/healthIndicators/entities/examTypes.entity';

export interface IProvider {
	name: ProvidersEnum;
	schema: Schema;
}
export const ExamTypesProvider: IProvider = {
	name: ProvidersEnum.EXAMTYPES,
	schema: ExamTypesSchema,
}
export const ExamsProvider: IProvider = {
	name: ProvidersEnum.EXAMS,
	schema: ExamsSchema
}

export const LabsProvider: IProvider = {
	name: ProvidersEnum.LABS,
	schema: LabsSchema
}

export const UsersProvider: IProvider = {
	name: ProvidersEnum.USERS,
	schema: UsersSchema
}

export const ReferenceValuesProvider: IProvider = {
	name: ProvidersEnum.REFERENCEVALUES,
	schema: ReferenceValuesSchema
}


export const RolesProvider: IProvider = {
	name: ProvidersEnum.ROLES,
	schema: RolesSchema
};

export const HealthIndicatorsProvider: IProvider = {
	name: ProvidersEnum.HEALTHINDICATORS,
	schema: HealthIndicatorsSchema
};

export const Providers = [ExamTypesProvider, ExamsProvider, LabsProvider, UsersProvider, ReferenceValuesProvider, RolesProvider, HealthIndicatorsProvider];
