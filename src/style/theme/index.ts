import { palette } from './palette';
import { spacing } from './spacing';
import { FontWeight, typography } from './typography';
import { zIndex } from './zIndex';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    zIndex: typeof zIndex;
    typography: typeof typography;
    spacing: typeof spacing;
    FontWeight: typeof FontWeight;
  }
}

export const theme = {
  palette,
  zIndex,
  typography,
  spacing,
  FontWeight,
};
