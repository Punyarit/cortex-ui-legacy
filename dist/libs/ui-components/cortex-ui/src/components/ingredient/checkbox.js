import { __decorate, __metadata } from "tslib";
import '@material/mwc-checkbox';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { customEvent } from '../../helper/helper';
let Checkbox = class Checkbox extends LitElement {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.disabled = false;
        this.styles = {
            border: 'var(--gray-400)',
            disabledColor: 'var(--gray-500)',
            checkedBackground: 'var(--gray-600)',
            background: 'var(--bg-content)',
        };
    }
    render() {
        return html `
      <style>
        :host {
          --mdc-checkbox-unchecked-color: ${this.styles.border};
          --mdc-checkbox-disabled-color: ${this.styles.disabledColor};
          --mdc-theme-secondary: ${this.styles.checkedBackground};
          --c-checkbox-background: ${this.styles.background};
        }
      </style>
      <div class="checkbox-wrapper">
        <mwc-checkbox
          .disabled="${this.disabled}"
          .checked="${this.checked}"
          @change="${(e) => this.onChange(e)}"
        ></mwc-checkbox>
      </div>
    `;
    }
    onChange(e) {
        customEvent(this, 'change', {
            checked: e.composedPath()[0].checked,
        });
    }
};
Checkbox.styles = css `
    .checkbox-wrapper {
      display: inline-block;
      background: var(--c-checkbox-background);
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 2px;
    }
  `;
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Checkbox.prototype, "checked", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Checkbox.prototype, "disabled", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], Checkbox.prototype, "styles", void 0);
Checkbox = __decorate([
    customElement('c-checkbox')
], Checkbox);
export { Checkbox };
//# sourceMappingURL=checkbox.js.map