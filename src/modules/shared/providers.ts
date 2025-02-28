import { LinksSchema } from '@modules/links/entities/links.entity';
import { RolesSchema } from '@modules/roles/entities/roles.entity';
import { UsersSchema } from '@modules/users/entities/users.entity';
import type { Schema } from "mongoose";
import { ProvidersEnum } from 'src/constants';
import { PlansSchema } from '@modules/saas/plans/entities/plans.entity';

export interface IProvider {
	name: ProvidersEnum;
	schema: Schema;
}

export const UsersProvider: IProvider = {
	name: ProvidersEnum.USERS,
	schema: UsersSchema
}

export const PlansProvider: IProvider = {
	name: ProvidersEnum.PLANS,
	schema: PlansSchema
}

export const RolesProvider: IProvider = {
	name: ProvidersEnum.ROLES,
	schema: RolesSchema
};


export const LinksProvider: IProvider = {
	name: ProvidersEnum.LINKS,
	schema: LinksSchema
};

export const Providers = [UsersProvider, RolesProvider, PlansProvider, LinksProvider];
