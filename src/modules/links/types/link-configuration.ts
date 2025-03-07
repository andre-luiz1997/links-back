import { LinkConfigurationTheme } from "src/constants";

export interface ILinkConfiguration {
  theme: LinkConfigurationTheme;
  main_color?: string
  secondary_color?: string;
  font_color?: string;
}