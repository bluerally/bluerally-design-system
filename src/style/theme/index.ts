import { palette } from './palette';
import { zIndex } from './zIndex';
import { typography, FontWeight } from './typography';
import { spacing } from './spacing';

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
