import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Translation = class Translation extends LitElement {
    constructor() {
        super(...arguments);
        this.withPrint = false;
    }
    render() {
        return html ` <slot></slot> `;
    }
    updated() {
        if (this.locales) {
            this.onTranslate();
        }
    }
    onTranslate() {
        this.display = this.locales[this.language];
        const cTranslates = this.shadowRoot?.host?.querySelectorAll('c-translate');
        if (cTranslates) {
            setTimeout(() => {
                for (const cTranslate of cTranslates) {
                    const translator = cTranslate?.shadowRoot?.querySelector('#translator');
                    const cTranslateHost = cTranslate?.shadowRoot?.host;
                    if (cTranslateHost && translator) {
                        if (typeof translator.textContent !== 'undefined' &&
                            this.display?.[cTranslateHost?.textContent?.trim() || '']) {
                            translator.innerText = this.display?.[cTranslateHost?.textContent?.trim() || ''];
                        }
                        cTranslate?.requestUpdate();
                    }
                }
            }, 0);
        }
        if (this.withPrint) {
            const cTexts = this.shadowRoot?.host?.querySelectorAll('c-text');
            this.translateText(cTexts);
            const cPapers = this.querySelector('c-papers');
            if (cPapers) {
                const cTexts = cPapers?.shadowRoot?.querySelectorAll('c-text');
                this.translateText(cTexts);
            }
        }
    }
    translateText(cTexts) {
        // with cText
        if (cTexts) {
            for (const cText of cTexts) {
                // cannot use swiftcase or else if
                // must check every text properties
                // waiting for improvement
                // const textAttributes = cText.attributes as NamedNodeMap;
                if (!cText)
                    return;
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
};
Translation.styles = css ``;
__decorate([
    property(),
    __metadata("design:type", Object)
], Translation.prototype, "locales", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Translation.prototype, "language", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Translation.prototype, "withPrint", void 0);
Translation = __decorate([
    customElement('c-translation')
], Translation);
export { Translation };
//# sourceMappingURL=translation.js.map