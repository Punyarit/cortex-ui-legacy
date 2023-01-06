// this component use for development not for production

import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('c-wrap')
export class Wrap extends LitElement {
  static styles = css`
    .wrapper {
      box-sizing: border-box;
      transition: box-shadow 0.45s;
      width: var(--w);
      min-width: var(--minW);
      max-width: var(--maxW);
      height: var(--h);
      min-height: var(--minH);
      max-height: var(--maxH);
      background: var(--bg);
    }

    .default {
      position: relative;
    }

    .fluid {
      position: relative;
      width: 100%;
    }
  `;

  @property()
  mt = 0;

  @property()
  mb = 0;

  @property()
  ml = 0;

  @property()
  mr = 0;

  @property()
  mx = 0;

  @property()
  my = 0;

  @property()
  pt = 0;

  @property()
  pb = 0;

  @property()
  pl = 0;

  @property()
  pr = 0;

  @property()
  px = 0;

  @property()
  py = 0;

  @property()
  styles = '';

  @property()
  type: 'default' | 'fluid' = 'default';

  @property()
  d: 'grid' | 'flex' | 'inline-block' | 'block' | 'inline' = 'block';

  @property()
  justify = 'flex-start';

  @property()
  aligns = 'flex-start';

  @property()
  colGap = 0;

  @property()
  rowGap = 0;

  @property()
  colGrid = 0;

  @property()
  rowGrid = 'none';

  @property()
  layout: 'column' | 'row' = 'row';

  @property()
  wrap = 'nowrap';

  @property()
  opacity = 1;

  @property()
  w = 'auto';

  @property()
  minW = 'auto';

  @property()
  maxW = 'auto';

  @property()
  h = 'auto';

  @property()
  minH = 'auto';

  @property()
  maxH = 'auto';

  @property()
  bg = 'transparent';

  render() {
    return html`
      <style>
        :host {
          --bg: ${this.bg};
          --w: ${this.w};
          --minW: ${this.minW};
          --maxW: ${this.maxW};
          --h: ${this.h};
          --minH: ${this.minH};
          --maxH: ${this.maxH};
          width: ${this.type === 'fluid' ? '100%' : this.w};
          height: ${this.h};
        }
        /* c-wrap is a component focused on helping to mange layout / spacing not use for style bg color shadow etc. */
        .wrapper {
          margin: ${this.my || this.mt} ${this.mx || this.mr} ${this.my || this.mb} ${this.mx || this.ml};
          padding: ${this.py || this.pt} ${this.px || this.pr} ${this.py || this.pb} ${this.px || this.pl};
          display: ${this.d};
          column-gap: ${this.colGap};
          row-gap: ${this.rowGap};
          grid-template-columns: ${this.colGrid};
          grid-template-rows: ${this.rowGrid};
          justify-content: ${this.justify};
          align-items: ${this.aligns};
          flex-direction: ${this.layout};
          flex-wrap: ${this.wrap};
          opacity: ${this.opacity};
        }
      </style>
      <div class="wrapper ${this.type}" style="${this.styles}">
        <slot></slot>
      </div>
    `;
  }
}
