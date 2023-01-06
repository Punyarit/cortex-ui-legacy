import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CPapers, CText, CTranslate } from '../../interfaces/components.interface';

@customElement('c-translation')
export class Translation extends LitElement {
  static styles = css``;

  @property()
  locales!: {
    [key: string]: Record<string, string>;
  };

  @property()
  language!: 'en' | 'th';

  public display!: Record<string, string>;

  @property()
  withPrint = false;

  render() {
    return html` <slot></slot> `;
  }

  updated() {
    if (this.locales) {
      this.onTranslate();
    }
  }

  onTranslate(): void {
    this.display = this.locales[this.language];
    const cTranslates = this.shadowRoot?.host?.querySelectorAll('c-translate');

    if (cTranslates) {
      setTimeout(() => {
        for (const cTranslate of cTranslates) {
          const translator = cTranslate?.shadowRoot?.querySelector('#translator') as HTMLElement;
          const cTranslateHost = cTranslate?.shadowRoot?.host as HTMLElement;
          if (cTranslateHost && translator) {
            if (
              typeof translator.textContent !== 'undefined' &&
              this.display?.[cTranslateHost?.textContent?.trim() || '']
            ) {
              translator.innerText = this.display?.[cTranslateHost?.textContent?.trim() || ''];
            }
            (cTranslate as CTranslate)?.requestUpdate();
          }
        }
      }, 0);
    }

    if (this.withPrint) {
      const cTexts = this.shadowRoot?.host?.querySelectorAll('c-text') as NodeListOf<CText>;
      this.translateText(cTexts);

      const cPapers = this.querySelector('c-papers') as CPapers;
      if (cPapers) {
        const cTexts = cPapers?.shadowRoot?.querySelectorAll('c-text') as NodeListOf<CText>;
        this.translateText(cTexts!);
      }
    }
  }

  translateText(cTexts: NodeListOf<CText>): void {
    // with cText

    if (cTexts) {
      for (const cText of cTexts) {
        // cannot use swiftcase or else if
        // must check every text properties

        // waiting for improvement
        // const textAttributes = cText.attributes as NamedNodeMap;

        if (!cText) return;
        if (cText.dot) {
          cText.dotTranslate = this.display[cText.dot];
        }

        if (cText.p) {
          cText.dataset.pTraslate = this.display[cText.p] || cText.p;
        }

        if (cText.pl) {
          cText.plTranslate = this.display[cText.pl];
        }

        if (cText.pr) {
          cText.prTranslate = this.display[cText.pr];
        }

        if (cText.box) {
          for (const value of cText.box) {
            cText.boxTranslate[value] = this.display[value];
          }
        }

        if (cText.boxl) {
          cText.boxlTranslate = this.display[cText.boxl];
        }

        if (cText.boxr) {
          cText.boxrTranslate = this.display[cText.boxr];
        }

        if (cText.pre) {
          for (const value of cText.pre) {
            // w8 for improve this logic
            cText.preTranslate[value] = cText.locale ? this.locales[cText.locale][value] : this.display[value];
          }
        }
        if (cText.prel) {
          cText.prelTranslate = this.display[cText.prel];
        }

        if (cText.prer) {
          cText.prerTranslate = this.display[cText.prer];
        }

        if (cText.post) {
          cText.postTranslate = this.display[cText.post];
        }

        if (cText.postl) {
          cText.postlTranslate = this.display[cText.postl];
        }

        if (cText.postr) {
          cText.postrTranslate = this.display[cText.postr];
        }

        cText?.requestUpdate();
      }
    }
  }
}
