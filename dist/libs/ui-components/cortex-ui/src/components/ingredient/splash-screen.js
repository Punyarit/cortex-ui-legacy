import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './image';
let SplashScreen = class SplashScreen extends LitElement {
    render() {
        return html `
      <div class="content-wrapper">
        <c-image .draggable="${false}" width="${this.size}" src="${this.imgSrc}" alt=""></c-image>
      </div>
    `;
    }
};
SplashScreen.styles = css `
    .content-wrapper {
      width: 100%;
      height: 100vh;
      display: grid;
      place-items: center;
    }

    c-image {
      animation: pulse 1s ease infinite;
    }

    @keyframes pulse {
      0% {
        opacity: 0.4;
      }
      50% {
        opacity: 1;
      }

      100% {
        opacity: 0.4;
      }
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], SplashScreen.prototype, "imgSrc", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], SplashScreen.prototype, "size", void 0);
SplashScreen = __decorate([
    customElement('c-splash-screen')
], SplashScreen);
export { SplashScreen };
//# sourceMappingURL=splash-screen.js.map