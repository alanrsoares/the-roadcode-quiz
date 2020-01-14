import { useContext } from "react";
import styled, {
  css as baseCSS,
  ThemeContext,
  ThemedCssFunction,
  ThemedStyledInterface,
  ThemeProps as BaseThemeProps
} from "styled-components";

import { Theme } from "ui/theme";

export type ThemeProps = BaseThemeProps<Theme>;

export type ThemedProps<P = {}> = ThemeProps & P;

export function useTheme() {
  return useContext<Theme>(ThemeContext);
}

export const getThemeProp = <P extends keyof Theme>(key: P) => <
  TProps extends ThemeProps = ThemeProps
>(
  lens: ((props: TProps) => keyof Theme[P]) | keyof Theme[P]
) => (props: TProps) => {
  const $value = typeof lens === "function" ? lens(props) : lens;

  return props.theme[key][$value];
};

export const getColor = getThemeProp("colors");
export const getRadius = getThemeProp("radii");
export const getFontSize = getThemeProp("fontSizes");
export const getShadow = getThemeProp("shadows");

export const css = baseCSS as ThemedCssFunction<Theme>;
export default styled as ThemedStyledInterface<Theme>;
