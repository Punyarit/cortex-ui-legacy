import { css } from 'lit';

export const transitionTheme = css`
  :host {
    --theme-bg-transition: background-color 0.75s ease-in;
    --theme-cl-transition: color 0.75s ease-in;
    --theme-shadow-transition: box-shadow 0.75s ease-in;
    --theme-border-transition: border 0.75s ease-in;
  }
`;
