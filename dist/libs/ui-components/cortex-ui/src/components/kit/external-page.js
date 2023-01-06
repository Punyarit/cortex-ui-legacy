import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timeout } from '../../helper/helper';
import '../ingredient/spinner';
let ExternalPage = class ExternalPage extends LitElement {
    constructor() {
        super(...arguments);
        this.loading = null;
    }
    render() {
        const params = new URL(document.location.href).searchParams;
        const queryString = `?screen=full&fromService=${this.internal}`;
        const newTab = params.get('_blank');
        return html `
      <div class="loading-wrapper">
        <div class="text-loading">
          <c-spinner size="8"></c-spinner>
          <div class="text">${this.external?.service}</div>
        </div>
      </div>

      <div class="wrapper-text-loading">
        <div class="full">
          <iframe loading="lazy" @load="${this.onLoad}" src="${newTab || this.external?.path}${queryString}"></iframe>
        </div>
      </div>
    `;
    }
    onLoad() {
        this.loading = false;
    }
    updated() {
        if (this.loading === false) {
            const loadingWrappe = this.shadowRoot?.querySelector('.loading-wrapper');
            loadingWrappe.classList.add('hide-loading');
            timeout(300).then(() => {
                loadingWrappe.remove();
            });
        }
    }
};
ExternalPage.styles = css `
    .full,
    iframe {
      border: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      position: relative;
    }

    .loading-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      display: grid;
      place-items: center;
    }

    .wrapper-text-loading {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .text-loading {
      font-size: var(--fs-64);
      color: var(--gray-600);
      margin-right: 128px;
      margin-bottom: 160px;
      display: flex;
      flex-direction: column;
      row-gap: 50px;
      align-items: center;
    }

    .hide-loading {
      animation: fade-out 0.3s ease;
    }
    @keyframes fade-out {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], ExternalPage.prototype, "internal", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], ExternalPage.prototype, "external", void 0);
__decorate([
    state(),
    __metadata("design:type", Boolean)
], ExternalPage.prototype, "loading", void 0);
ExternalPage = __decorate([
    customElement('c-external-page')
], ExternalPage);
export { ExternalPage };
var Services;
(function (Services) {
    Services["calendar"] = "slothUrl";
})(Services || (Services = {}));
//# sourceMappingURL=external-page.js.map