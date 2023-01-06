import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';
import { CPapers, CTranslation } from '../../interfaces/components.interface';
import '../ingredient/icon';

@customElement('c-print')
export class Print extends LitElement {
  static styles = css`
    :host {
      display: var(--display);
    }

    .print-wrapper {
      display: flex;
      justify-content: center;
      overflow: auto;
      padding-top: 32px;
      box-sizing: border-box;
    }

    .paper-wrapper {
      display: flex;
      flex-flow: column;
      /* row-gap: 24px; */
      align-items: center;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #8ba3b8;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
      height: 8px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #bbc5ce;
      border-radius: 10px;
    }

    .preview-mode {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 9999;
      left: 0;
      top: 0;
      background: #27292eb3;
      backdrop-filter: blur(4.5px);
    }

    .feature-btn {
      position: fixed;
      border-radius: 50%;
      background: #34353a;
      transition: background 0.25s, color 0.25s;
      cursor: pointer;
      display: flex;
      justify-content: center;
      width: 64px;
      height: 64px;
      align-items: center;
      border: 0;
      z-index: 10000;
    }

    .btn-disabled {
      opacity: 0.25;
    }

    .feature-btn:focus {
      border: 2px solid #777b8b;
    }

    .print-btn {
      color: #dee4f3;
      right: 42px;
      top: 48px;
    }

    .feature-btn:hover {
      background: #3e4149;
    }

    .feature-btn:active {
      color: white;
      background: #5b5e68;
    }

    .en-btn {
      color: #dee4f3;
      right: 42px;
      top: 120px;
    }

    .th-btn {
      color: #dee4f3;
      right: 42px;
      top: 192px;
    }

    .hotkey-wrapper {
      position: fixed;
      color: white;
      bottom: 16px;
      right: 24px;
      z-index: 10000;
      font-size: var(--fs-12);
    }

    .hotkey-text {
      display: flex;
      column-gap: 12px;
    }

    .hotkey {
      width: 40px;
    }

    .papers-preview-alert {
      position: fixed;
      border-radius: 8px;
      background: #34353a;
      padding: 3px 10px 7px 10px;
      z-index: 10000;
      color: #f0f023;
      right: 31px;
      top: 3px;
      text-align: center;
      width: 74px;
      font-size: var(--fs-12);
    }
  `;

  @property()
  paper = 'A4';

  @property({
    type: Object,
  })
  preview = false;

  @property()
  setLanguage = false;

  @state()
  CTranslations?: NodeListOf<CTranslation> | undefined;

  @state()
  private isCPapersPreview = false;

  @property()
  destroyFirst = false;

  private hotkey = false;

  render() {
    return html`
      <style>
        :host {
          --display: ${this.preview ? 'block' : 'none'};
        }
      </style>

      ${this.preview
        ? html` ${this.isCPapersPreview
              ? html`<div class="papers-preview-alert">c-papers is in preview state.</div>`
              : undefined}

            <button
              .disabled="${this.isCPapersPreview}"
              class="print-btn feature-btn ${this.isCPapersPreview ? 'btn-disabled' : ''}"
              @click="${() => this.printPreview({ previewAfterPrint: true })}"
            >
              <c-icon icon="u_print" size="26"></c-icon>
            </button>
            ${this.CTranslations && this.setLanguage
              ? html`
                  <button class="feature-btn en-btn" @click="${() => this.setPrintLanguage('en')}">EN</button>
                  <button class="feature-btn th-btn" @click="${() => this.setPrintLanguage('th')}">TH</button>
                `
              : undefined}

            <div class="hotkey-wrapper">
              <div class="hotkey-text">
                <div class="hotkey">Alt + P</div>
                <div>Open Preview</div>
              </div>
              <div class="hotkey-text">
                <div class="hotkey">ESC</div>
                <div>Close Preview</div>
              </div>
            </div>

            <div class="print-wrapper">
              <div class="paper-wrapper">
                <slot></slot>
              </div>
            </div>`
        : html` <slot></slot> `}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    this.onDispatchEvent('print', {
      print: this.print.bind(this),
    });

    const cPapers = this.querySelector('c-papers') as CPapers;

    if (cPapers && cPapers!.preview) {
      this.isCPapersPreview = true;
    }

    const cTranslations = this?.querySelectorAll('c-translation') as NodeListOf<CTranslation>;

    if (cTranslations?.length) {
      this.CTranslations = cTranslations;
    }

    // if remove dom first loaded image will not display
    if (this.destroyFirst) this.shadowRoot?.host?.remove();
  }

  updated() {
    // for debug only, user cant use preview mode in c-print

    if (this.preview) {
      this.setPrintPreviewDisplay();
      this.setHotKeyPreview();
    }
  }

  private setHotKeyPreview() {
    this.hotkey = true;
    const keysDown: Record<string, boolean> = {};
    window.onkeydown = (e: KeyboardEvent) => {
      if (this.hotkey) {
        keysDown[e.key] = true;
        switch (true) {
          case keysDown['Alt'] && keysDown['p']:
            this.preview = true;
            break;

          case keysDown['Escape']:
            this.preview = false;
            break;

          default:
            break;
        }
      }
    };

    window.onkeyup = (e: KeyboardEvent) => {
      if (this.hotkey) keysDown[e.key] = false;
    };
  }

  setPrintLanguage(lang: 'en' | 'th') {
    setTimeout(() => {
      this.CTranslations?.forEach(translationElement => {
        translationElement.language = lang;
        translationElement.requestUpdate();
      });
    }, 0);
  }

  asyncPrint(delay?: number) {
    this.preview = true;
    // if use visibility:hidden /display:none = wrong display
    this.style.opacity = '0';

    const cPapers = this.querySelector('c-papers') as CPapers;
    if (cPapers) cPapers?.genaratePaper();

    setTimeout(() => {
      this.style.opacity = '1';
      this.printPreview({ previewAfterPrint: false });
    }, delay || 0);
  }

  printPreview({ previewAfterPrint }: { previewAfterPrint: boolean }) {
    this.preview = false;
    const cTheme = document.body.querySelector('c-theme');

    timeout(0).then(() => {
      this.print(0, () => {
        cTheme?.firstElementChild?.classList?.remove('no-print');
        this?.classList.remove('is-print');
        cTheme?.appendChild(this);
        if (previewAfterPrint) {
          this.preview = true;
        }
      });
    });
  }

  setPrintPreviewDisplay() {
    const printWrapper = this.shadowRoot?.querySelector('.print-wrapper');
    const cTheme = document.body.querySelector('c-theme');
    this?.classList.add('preview-mode');
    printWrapper?.classList.add('preview-mode');
    cTheme?.appendChild(this);
    setTimeout(() => {
      this.setEachPaperMargin();
    }, 0);
  }

  setEachPaperMargin() {
    const allPaper = this?.querySelectorAll('c-paper');

    allPaper!.forEach(ele => {
      const paper = ele?.shadowRoot?.querySelector('.paper-wrapper') as HTMLElement;
      paper?.classList.add('preview-margin');
    });
  }

  removePaperMargin() {
    const allPaper = this?.querySelectorAll('c-paper');
    allPaper!.forEach(ele => {
      const paper = ele?.shadowRoot?.querySelector('.paper-wrapper') as HTMLElement;
      paper.classList.remove('preview-margin');
    });
  }

  print = (delay = 0, callback?: () => void) => {
    const cPapers = this.querySelector('c-papers') as CPapers;

    if (this.preview) {
      this.removePaperMargin();
    }

    timeout(delay)
      .then(() => {
        const cTheme = document.body.querySelector('c-theme');
        cTheme?.firstElementChild?.classList?.add('no-print');
        this?.classList?.add('is-print');
        cTheme?.appendChild(this);

        if (cPapers) {
          cPapers.nextPageLine = false;
        }
      })
      .then(() => {
        window.print();
      })
      .then(() => {
        this?.remove();
        if (callback) callback();
        if (cPapers) cPapers.nextPageLine = true;
      });
  };

  onDispatchEvent(event: string, data?: Record<string, unknown>): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          ...data,
        },
        bubbles: true,
      })
    );
  }
}
