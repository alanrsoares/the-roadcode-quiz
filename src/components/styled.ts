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
  gray: "#CCC"
};

const baseRadius = 4;

export const radii = {
  default: baseRadius
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
  fontSizes
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
  val: keyof Theme[P]
) => (props: TProps) => props.theme[key][val];

export const getColor = getThemeProp("colors");

export const getRadius = getThemeProp("radii");

export const getFontSize = getThemeProp("fontSizes");

export default baseStyled as ThemedStyledInterface<Theme>;
