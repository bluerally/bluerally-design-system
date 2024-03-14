export enum ZIndex {
  DEFAULT = 0,
  DIM = 1000,
  MODAL,
  SNACKBAR = 3000,
  TOOLTIP,
}

export const zIndex = {
  DIM: ZIndex.DIM,
  MODAL: ZIndex.MODAL,
  SNACKBAR: ZIndex.SNACKBAR,
  TOOLTIP: ZIndex.TOOLTIP,
};
