import { __decorate, __metadata } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
let Skeleton = class Skeleton extends LitElement {
    constructor() {
        super(...arguments);
        this.width = '60px';
        this.height = '60px';
        this.opacity = 1;
        this.type = 'square';
        this.rotate = '0deg';
        this.bgSizeWidth = 0;
    }
    render() {
        return html `
      <style>
        .skeleton-wrapper {
          border-radius: ${this.type === 'square' ? '8px' : '50%'};
          width: ${this.width};
          height: ${this.height};
          transform: rotate(${this.rotate});
          opacity: ${this.opacity};
        }

        /* ไม่ใฟ้ animation เอียง ดังนั้นต้องลบค่า rotate อีกที  */
        .skeleton-wrapper::before {
          transform: rotate(-${this.rotate}) scale(${this.rotate ? '1.4' : '1'});
        }

        .skeleton-wrapper::before {
          background-size: ${this.bgSizeWidth * 2}px 100%;
        }
      </style>
      <div class="skeleton-wrapper"></div>
    `;
    }
    firstUpdated() {
        this.setBgSizeWidth();
        window.addEventListener('resize', () => {
            this.setBgSizeWidth();
        });
    }
    setBgSizeWidth() {
        if (this.width.includes('px')) {
            this.bgSizeWidth = +this.width.replace('px', '');
        }
        else {
            // ใช้ 100% ได้ตอน load ครั้งแรกเท่านั้น
            const skeletonWrapper = this.shadowRoot?.querySelector('.skeleton-wrapper');
            if (skeletonWrapper) {
                this.bgSizeWidth = skeletonWrapper?.getBoundingClientRect()?.width;
            }
        }
    }
};
Skeleton.styles = css `
    .skeleton-wrapper {
      position: relative;
      overflow: hidden;
      background: var(--cl-skeleton-base);
    }

    .skeleton-wrapper::before {
      position: absolute;
      content: '';
      height: 100%;
      width: 100%;
      background-image: linear-gradient(
        to right,
        var(--cl-skeleton-base) 0%,
        var(--cl-skeleton-load) 20%,
        var(--cl-skeleton-base) 40%,
        var(--cl-skeleton-base) 100%
      );
      background-repeat: no-repeat;
      animation: wave 0.8s linear infinite;
      background-position: 70% 0;
    }

    @keyframes wave {
      0% {
        background-position: 70% 0;
      }

      100% {
        background-position: -100% 0;
      }
    }
  `;
__decorate([
    property(),
    __metadata("design:type", Object)
], Skeleton.prototype, "width", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Skeleton.prototype, "height", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Skeleton.prototype, "opacity", void 0);
__decorate([
    property(),
    __metadata("design:type", String)
], Skeleton.prototype, "type", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], Skeleton.prototype, "rotate", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], Skeleton.prototype, "bgSizeWidth", void 0);
Skeleton = __decorate([
    customElement('c-skeleton')
], Skeleton);
export { Skeleton };
//# sourceMappingURL=skeleton.js.map