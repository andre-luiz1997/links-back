import type { ILinkProfile, ILinks } from "@modules/links/types/links";
import { IUsers } from "@modules/users/types/users";
import { Types, Schema } from "mongoose"
import { ILinkConfiguration } from "../types/link-configuration";
import { ILinkItem } from "../types/link-items";
import { ProvidersEnum } from "src/constants";
import { ILinkSocial } from "../types/link-social";

export class LinksEntity implements ILinks {
  _id: Types.ObjectId;
  user: IUsers;
  status = true;
  profile: ILinkProfile;
  socialLinks?: ILinkSocial[];
  title?: string;
  items?: ILinkItem[];
  configuration: ILinkConfiguration;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const LinkSocialSchema = new Schema<ILinkSocial>({
  company: { type: String, required: true },
  icon: { type: String, required: true },
  url: { type: String, required: true },
  status: { type: Boolean, required: true, default: true }
}, { _id: false });

export const LinkProfileSchema = new Schema<ILinkProfile>({
  image: { type: Types.ObjectId, ref: ProvidersEnum.FILES, required: false },
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  show: { type: Boolean, required: true, default: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  phone2: { type: String, required: false }
}, { _id: false })

export const LinkItemSchema = new Schema<ILinkItem>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  status: { type: Boolean, required: true, default: true }
}, { _id: false });

export const LinkConfigurationSchema = new Schema<ILinkConfiguration>({
  theme: { type: String, required: true },
  main_color: { type: String, required: false },
  secondary_color: { type: String, required: false },
  font_color: { type: String, required: false }
}, {_id: false})

export const LinksSchema = new Schema<LinksEntity>({
  _id: Types.ObjectId,
  status: { type: Boolean, required: true, default: true },
  title: { type: String, required: false },
  user: { type: Types.ObjectId, ref: ProvidersEnum.USERS, required: true },
  items: { type: [LinkItemSchema], required: false },
  configuration: { type: LinkConfigurationSchema, required: true },
  profile: { type: LinkProfileSchema, required: true },
  socialLinks: { type: [LinkSocialSchema], required: false }
}, {
  timestamps: true,
})
