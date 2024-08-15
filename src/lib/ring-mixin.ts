import { css } from "styled-components";

/**
 * Represents an RGB color as a string in the format `rgb(${number},${number},${number})`
 * or as a tuple of numbers `[number, number, number]`.
 */
type RGB = `rgb(${number},${number},${number})` | [number, number, number];

/**
 * Props for the `ring` mixin.
 */
interface RingProps {
  /** Width of the ring (default is '4px'). */
  ringWidth?: string | number;

  /** Color of the ring in RGB format (default is 'rgb(59, 130, 246)'). */
  ringColor?: RGB;

  /** Opacity of the ring (default is 0.5). */
  ringOpacity?: number;

  /** Width of the offset around the ring (default is '0px'). */
  ringOffsetWidth?: string | number;

  /** Color of the offset around the ring in RGB format (default is 'rgb(0, 0, 0)'). */
  ringOffsetColor?: RGB;

  /** Whether the ring should be inset (default is false). */
  inset?: boolean;
}

/**
 * Parses an RGB color and combines it with an opacity to create an RGBA color string.
 *
 * @param color - The RGB color to parse, either as a string or a tuple.
 * @param opacity - The opacity to apply to the color.
 * @returns The color as an RGBA string.
 */
const parseColor = (color: RGB, opacity: number): string => {
  if (typeof color === "string") {
    // Converts `rgb(${number},${number},${number})` to `rgba(${number},${number},${number}, ${opacity})`
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  }
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
};

/**
 * A styled-components mixin that applies a ring effect similar to TailwindCSS's `ring` utility.
 *
 * @param ringWidth - The width of the ring (default is '4px').
 * @param ringColor - The color of the ring, provided as an RGB string or tuple (default is 'rgb(59, 130, 246)').
 * @param ringOpacity - The opacity of the ring (default is 0.5).
 * @param ringOffsetWidth - The width of the offset around the ring (default is '0px').
 * @param ringOffsetColor - The color of the offset around the ring, provided as an RGB string or tuple (default is 'rgb(0, 0, 0)').
 * @param inset - Whether the ring should be inset (default is false).
 * @returns A CSS string to be applied to a styled component.
 *
 * @example
 * ```typescript
 * import styled from 'styled-components';
 * import { ring } from './ring-mixin';
 *
 * const Button = styled.button`
 *   ${ring({
 *     ringWidth: '4px',
 *     ringColor: 'rgb(34,197,94)', // Green color as an RGB string
 *     ringOpacity: 0.6,
 *     ringOffsetWidth: '2px',
 *     ringOffsetColor: 'rgb(31,41,55)', // Offset color as an RGB string
 *     inset: false,
 *   })}
 *   padding: 10px 20px;
 *   border-radius: 8px;
 *   background-color: #1f2937;
 *   color: white;
 *   border: none;
 *   cursor: pointer;
 *
 *   &:hover {
 *     background-color: #4b5563;
 *   }
 * `;
 *
 * export default Button;
 * ```
 */
export const ring = ({
  ringWidth = "4px",
  ringColor = "rgb(59, 130, 246)",
  ringOpacity = 0.5,
  ringOffsetWidth = "0px",
  ringOffsetColor = "rgb(0, 0, 0)",
  inset = false,
}: RingProps) => {
  const ringInset = inset ? "inset" : "";

  return css`
    box-shadow: ${ringInset} 0 0 0 ${ringOffsetWidth}
        ${typeof ringOffsetColor === "string"
          ? ringOffsetColor
          : `rgb(${ringOffsetColor.join(",")})`},
      ${ringInset} 0 0 0 calc(${ringWidth} + ${ringOffsetWidth})
        ${parseColor(ringColor, ringOpacity)},
      0 0 #0000;
  `;
};
