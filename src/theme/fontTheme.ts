import { css } from 'lit';

export const fontTheme = css`
  :host {
    --font-family: Sarabun-Regular;
    --font-regular: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
  }

  :host(.tiny) {
    --fs-12: 0.75rem;
    --fs-14: 0.875rem;
    --fs-16: 1rem;
    --fs-18: 1.125rem;
    --fs-20: 1.25rem;
    --fs-22: 1.375rem;
    --fs-24: 1.5rem;
    --fs-26: 1.625rem;
    --fs-28: 1.75rem;
    --fs-30: 1.875rem;
    --fs-32: 2rem;
    --fs-34: 2.125rem;
    --fs-36: 2.25rem;
    --fs-48: 3rem;
    --fs-64: 4rem;
  }

  :host(.small) {
    --fs-12: 0.875rem;
    --fs-14: 1rem;
    --fs-16: 1.125rem;
    --fs-18: 1.25rem;
    --fs-20: 1.375rem;
    --fs-22: 1.5rem;
    --fs-24: 1.625rem;
    --fs-26: 1.75rem;
    --fs-28: 1.875rem;
    --fs-30: 2rem;
    --fs-32: 2.125rem;
    --fs-34: 2.25rem;
    --fs-36: 2.375rem;
    --fs-48: 3.125rem;
    --fs-64: 4.125rem;
  }

  :host(.medium) {
    --fs-12: 1rem;
    --fs-14: 1.125rem;
    --fs-16: 1.25rem;
    --fs-18: 1.375rem;
    --fs-20: 1.5rem;
    --fs-22: 1.625rem;
    --fs-24: 1.75rem;
    --fs-26: 1.875rem;
    --fs-28: 2rem;
    --fs-30: 2.125rem;
    --fs-32: 2.25rem;
    --fs-34: 2.375rem;
    --fs-36: 2.5rem;
    --fs-48: 3.25rem;
    --fs-64: 4.25rem;
  }

  :host(.large) {
    --fs-12: 1.125rem;
    --fs-14: 1.25rem;
    --fs-16: 1.375rem;
    --fs-18: 1.5rem;
    --fs-20: 1.625rem;
    --fs-22: 1.75rem;
    --fs-24: 1.875rem;
    --fs-26: 2rem;
    --fs-28: 2.125rem;
    --fs-30: 2.25rem;
    --fs-32: 2.375rem;
    --fs-34: 2.5rem;
    --fs-36: 2.625rem;
    --fs-48: 3.375rem;
    --fs-64: 4.375rem;
  }

  :host(.huge) {
    --fs-12: 1.25rem;
    --fs-14: 1.375rem;
    --fs-16: 1.5rem;
    --fs-18: 1.625rem;
    --fs-20: 1.75rem;
    --fs-22: 1.875rem;
    --fs-24: 2rem;
    --fs-26: 2.125rem;
    --fs-28: 2.25rem;
    --fs-30: 2.375rem;
    --fs-32: 2.5rem;
    --fs-34: 2.625rem;
    --fs-36: 2.75rem;
    --fs-48: 3.5rem;
    --fs-64: 4.5rem;
  }
`;
