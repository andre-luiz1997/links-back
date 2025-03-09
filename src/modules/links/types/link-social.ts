export const LinkSocialCompanies = {
  facebook: { name: 'facebook', icon: 'faBrandFacebook' },
  instagram: { name: 'instagram', icon: 'faBrandInstagram' },
  twitter: { name: 'twitter', icon: 'faBrandXTwitter' },
  tiktok: { name: 'tiktok', icon: 'faBrandTiktok' },
  youtube: { name: 'youtube', icon: 'faBrandYoutube' },
} as const;

export type LinkSocialCompanyName = typeof LinkSocialCompanies[keyof typeof LinkSocialCompanies]['name'];
export type LinkSocialCompanyIcon = typeof LinkSocialCompanies[keyof typeof LinkSocialCompanies]['icon'];

export interface ILinkSocial {
  company: LinkSocialCompanyName;
  icon: LinkSocialCompanyIcon;
  url: string;
  status: boolean;
}
