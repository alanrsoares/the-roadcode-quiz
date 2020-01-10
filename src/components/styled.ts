import { useContext } from "react";
import baseStyled, {
  ThemeContext,
  ThemedStyledInterface,
  ThemeProps as BaseThemeProps
} from "styled-components";

export const colors = {
  primary: "#FFD400",
  secondary: "#3482B9",
  positive: "#49C04A",
  negative: "#D03930",
  neutral: "#AAA",
  muted: "#EAEAEA",
  hotpink: "#FC8BA4",
  black: "#333",
  white: "#FFF",
  gray: "#CCC",
  shadow: "rgba(0, 0, 0, 0.4)"
};

export const radii = {
  default: "0.2em",
  sm: "0.1em",
  md: "0.2em",
  lg: "0.3em",
  round: "50%"
};

export const shadows = {
  default: `0 2px 6px ${colors.shadow}`
};

const baseFontSize = 18;

export const fontSizes = {
  default: baseFontSize,
  small: baseFontSize * 0.8,
  large: baseFontSize * 1.2
};

export const theme = {
  colors,
  radii,
  fontSizes,
  shadows
};

export type Color = keyof typeof colors;

export type Radius = keyof typeof radii;

export type FontSize = keyof typeof fontSizes;

export type Theme = typeof theme;

export type ThemeProps = BaseThemeProps<Theme>;

export type ThemedProps<P = {}> = ThemeProps & P;

export function useTheme() {
  return useContext<Theme>(ThemeContext);
}

export const getThemeProp = <P extends keyof Theme>(key: P) => <
  TProps extends ThemeProps = ThemeProps
>(
  value: keyof Theme[P]
) => (props: TProps) => props.theme[key][value];

export const getColor = getThemeProp("colors");
export const getRadius = getThemeProp("radii");
export const getFontSize = getThemeProp("fontSizes");
export const getShadow = getThemeProp("shadows");

export default baseStyled as ThemedStyledInterface<Theme>;
