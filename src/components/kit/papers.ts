import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { CRow } from '../../interfaces/components.interface';

interface PapersConfig {
  pageNumber: 'TOP_LEFT' | 'TOP_CENTER' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_CENTER' | 'BOTTOM_RIGHT' | 'NONE';
  dynamicPage: boolean;
}

@customElement('c-papers')
export class Papers extends LitElement {
  static styles = css`
    .paper-wrapper {
      max-width: var(--width);
      min-width: var(--width);
      max-height: var(--height);
      min-height: var(--height);
      background: var(--white-1);
      box-sizing: border-box;
      overflow: hidden;
      height: var(--height);
      display: flex;
      flex-flow: column;
      position: relative;
      box-shadow: var(--box-shadow);
    }

    .header-page {
      position: absolute;
      top: 0;
    }

    .footer-page {
      position: absolute;
      bottom: 0;
    }

    .outside-wrapper {
      position: relative;
    }

    .wrapper {
      margin-bottom: 32px;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100000;
    }
  `;

  @property()
  padding = '0';

  @property()
  height = 'auto';

  @property()
  width = 'auto';

  @property({
    type: Object,
  })
  config: PapersConfig = {
    pageNumber: 'NONE',
    dynamicPage: true,
  };

  @query('[data-paper]')
  paperRef!: HTMLDivElement;

  @query('.wrapper')
  wrapperRef!: HTMLDivElement;

  @query('.header-page')
  headerPageRef!: HTMLDivElement;

  @query('.footer-page')
  footerPageRef!: HTMLDivElement;

  @state()
  nextPageLine = true;

  @property({
    type: Object,
  })
  preview = false;

  // when c-print is preview it will provide padding top 32
  // async print will print from print preview
  private printPreviewPaddingTop = 32;

  // this property for magic number with angular
  @property({
    type: Number,
  })
  public pageMargin = 0;

  render() {
    return html`
      <style>
        :host {
          --padding: ${this.padding};
          --box-shadow: ${this.nextPageLine ? '0 0 2px 2px rgba(0,0,0,0.7)' : 'none'};
        }
      </style>
      <div class="outside-wrapper">
        <div class="content">
          <slot data-content name="content"></slot>
        </div>
        <div class="wrapper">
          <div data-paper class="paper-wrapper">
            <div class="header-page">
              <slot name="header"></slot>
            </div>
            <div class="footer-page">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    this.observeDom();
  }

  observeDom() {
    const observer = new MutationObserver(() => {
      this.genaratePaper();
    });

    const config = { subtree: true, childList: true };
    observer.observe(this, config);
    return observer;
  }

  updated() {
    this.style.setProperty('--width', `${this.width}`);
    this.style.setProperty('--height', `${this.height}`);

    if (!this.config.dynamicPage || this.pageMargin !== 0) {
      this.genaratePaper();
    }

    if (this.preview) {
      this.pageMargin = 0;
    }
  }

  genaratePaper() {
    setTimeout(() => {
      let tuneValue = +this.pageMargin;
      const paperHeight = +this.height.replace('px', '');
      const header = this?.querySelector('[slot="header"]');
      const footer = this?.querySelector('[slot="footer"]');
      const rows = this.querySelectorAll('c-row') as NodeListOf<CRow>;
      // add margin header margin first row
      (rows[0]!.shadowRoot!.lastElementChild as HTMLElement)!.style!.paddingTop = `${
        this!.headerPageRef!.offsetHeight
      }px`;
      let paperHeightStack = paperHeight;
      rows.forEach(cRow => {
        const rowWrapper = cRow?.shadowRoot?.lastElementChild as HTMLDivElement;

        if (
          cRow?.offsetHeight + cRow?.offsetTop + this.printPreviewPaddingTop >
          paperHeightStack - this!.footerPageRef!.offsetHeight - tuneValue
        ) {
          // add margin to row
          rowWrapper!.style!.paddingTop = `${
            paperHeightStack -
            (cRow?.offsetTop - this.printPreviewPaddingTop) +
            this!.headerPageRef!.offsetHeight -
            tuneValue
          }px`;

          tuneValue += +this.pageMargin;

          // this condition is for avoiding creating empty paper
          const wrapper = this.shadowRoot?.querySelector('.wrapper') as HTMLElement;
          if (wrapper?.offsetHeight < cRow?.offsetHeight + cRow?.offsetTop) {
            // create paper
            const newHeader = header?.cloneNode(true) as HTMLElement;

            const newFooter = footer?.cloneNode(true) as HTMLElement;
            newHeader?.classList?.add('header-page');
            newFooter?.classList?.add('footer-page');

            const newPaper = this.paperRef?.cloneNode() as HTMLElement;
            newPaper.appendChild(newHeader);
            newPaper.appendChild(newFooter);
            this.wrapperRef?.appendChild(newPaper);
          }

          // stack
          paperHeightStack += paperHeight;
        }
      });
    }, 0);
  }
}
