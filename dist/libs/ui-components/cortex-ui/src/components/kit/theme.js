import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { constantColorTheme, coolTheme, standardTheme, warmTheme } from '../../theme/colorTheme';
import { fontTheme } from '../../theme/fontTheme';
import { transitionTheme } from '../../theme/transitionTheme';
let Theme = class Theme extends LitElement {
    render() {
        return html ` <slot></slot> `;
    }
    firstUpdated() {
        const theme = localStorage.getItem('theme');
        const cTheme = this.shadowRoot?.host;
        if (theme) {
            cTheme.className = theme;
        }
    }
};
Theme.styles = [constantColorTheme, coolTheme, standardTheme, warmTheme, fontTheme, transitionTheme];
Theme = __decorate([
    customElement('c-theme')
], Theme);
export { Theme };
//# sourceMappingURL=theme.js.map