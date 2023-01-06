import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getTextWidth } from '../../helper/helper';

@customElement('c-row')
export class Row extends LitElement {
  static styles = css`
    .row-wrapper {
      display: flex;
      column-gap: var(--column-gap);
      row-gap: var(--row-gap);
      flex-flow: var(--flex-flow);
      position: relative;
      justify-content: var(--align);
      width: var(--width);
    }

    .count-label {
      position: absolute;
      left: -24px;
    }

    .paragraph-wrapper {
      position: absolute;
      top: var(--top);
      padding: 0 4px;
      box-sizing: border-box;
      line-height: var(--line-height);
      font-size: var(--font-size);
      color: var(--color);
      display: -webkit-box;
      -webkit-line-clamp: var(--line-clamp);
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .paragraph-text {
      display: inline;
      margin-left: var(--first-letter-left);
    }

    .c-row-highlight {
      font-weight: 700;
    }
  `;

  @property()
  width = '100%';

  @property()
  colGap = '4px;';

  @property()
  rowGap = '12px';

  @property()
  aligns: 'left' | 'center' | 'right' = 'left';

  @property()
  paragraph?: string;

  @property()
  paragraphHTML?: string;

  @property()
  size = '16px';

  @property()
  color = 'var(--gray-800)';

  @property()
  flexFlow = 'row wrap';

  @property({
    type: Number,
  })
  lineHeight = 20.9;
  // 20.9 for angular
  // 23.9 for react
  // 24.9 for next

  @property({
    type: Object,
  })
  highlight?: Record<string, string>;

  render() {
    return html`
      <style>
        :host {
          --column-gap: ${this.colGap};
          --row-gap: ${this.rowGap};
          --font-size: ${this.size};
          --color: ${this.color};
          --width: ${this.width};
          --flex-flow: ${this.flexFlow};
        }
      </style>

      <div class="row-wrapper">
        <!-- ใช้กรณีต้องการ Debug Row ว่าแต่ละแถวคือบรรทัดที่เท่าไหร่ -->
        <!-- <div class="count-label"></div> -->
        ${this.paragraph || this.paragraphHTML
          ? html` <div class="paragraph-wrapper">
              <div class="paragraph-text">${this.paragraph}</div>
            </div>`
          : undefined}

        <slot></slot>
      </div>
    `;
  }

  firstUpdated() {
    const host = this.shadowRoot?.host as HTMLElement;
    let justifyContent = 'flex-start';

    switch (this.aligns) {
      case 'left':
        justifyContent = 'flex-start';
        break;
      case 'center':
        justifyContent = 'center';
        break;

      case 'right':
        justifyContent = 'flex-end';
        break;
      default:
        break;
    }

    host.style.setProperty('--align', justifyContent);

    if (this.paragraph || this.paragraphHTML) {
      host.style.setProperty('--line-clamp', `${host.childElementCount}`);
    }
  }

  updated() {
    if (this.paragraph || this.paragraphHTML) {
      this.paragraphText();
    }

    if (this.paragraph && this.highlight) {
      this.highlightText();
    }
  }

  highlightText() {
    let paragraph = JSON.parse(JSON.stringify(this.paragraph)) as string;

    for (const [keyText, styles] of Object.entries(this.highlight!)) {
      const [fontSize = '16px', fontWeight = '400', color = 'var(--gray-800)'] = styles.split(' ');

      paragraph = paragraph.replace(
        keyText,
        `<span style="font-size:${fontSize}; font-weight:${fontWeight}; color:${color}">${keyText}</span>`
      );
    }
    const paragraphText = this.shadowRoot?.querySelector('.paragraph-text');
    paragraphText!.innerHTML = paragraph;
  }

  paragraphText() {
    const rowHost = this.shadowRoot?.host as HTMLElement;
    const textFirstElement = rowHost?.firstElementChild;
    setTimeout(() => {
      const pWrapper = textFirstElement?.shadowRoot?.querySelector('.p-wrapper') as HTMLElement;
      const pWrapperStyles = window.getComputedStyle(pWrapper);
      const width = getTextWidth(pWrapper?.innerText, pWrapperStyles.fontSize, pWrapperStyles.fontFamily);
      const rowGapSize = +this.rowGap?.replace('px', '');

      // limitation ของ set top คือ หาก font เริิ่มน้อยกว่า 12 และมากกว่า 20 ค่าความแม่นยำที่จะแม่นลง ดังนั้นจึงต้องบวก 2 / -2 แต่หากเกินขอบเขตไปมากกว่านั้นอาจจะใช้ไม่ได้ (ซึ่งปกติจะไม่มีการใช้ font ที่น้อย/มาก เกินไป)
      let fontSize = +this.size?.replace('px', '');
      if (fontSize < 13) {
        fontSize = fontSize + 2;
      } else if (fontSize > 19) {
        fontSize = fontSize - 2;
      }
      // set first letter space
      // 16 คือพื้นที่ที่ต้องการให้เพิ่มจากขนาดของ width
      rowHost.style.setProperty('--first-letter-left', `${width + 8}px`);
      // set line height
      // 1px's row gap = 20.9px's line height
      rowHost.style.setProperty('--line-height', `${rowGapSize + this.lineHeight}px`);

      // set top
      // 1px rowgap สัดส่วนครึ่งหนึ่งของค่า top ดังนั้นจึงนำ 0.5 มาคูณ
      // -4 คือพื้นที่ gap ระหว่าง dot กับตัวอักษร
      // font size 16 px จะไม่มีการนำ space มาคำนวนจึง = 0
      // ซึ่ง pattern ของการนำ font size มาคำนวนคือการนำ 16 มาลบกับ fontsize ที่ส่งเข้ามาจะได้ค่าที่จะสามารถนำมาคำนวนได้
      // โดยค่า font size ที่จะนำมาคำนวนนั้นจะเป็นค่าที่เพิ่ม หรือ ลดลงจาก 16 ทีละ 1 เช่น หากส่ง size เปน 15 จะได้ค่า 1 (16-15), ส่งค่า 14 จะได้ 2 (16-14) หรือส่ง 17 เข้ามาจะได้ (-1) เป็นต้น
      rowHost.style.setProperty('--top', `-${rowGapSize * 0.5 + 4 + (16 - fontSize)}px`);
      // too much math. sorry :(

      if (this.paragraphHTML) {
        const paragraphText = this.shadowRoot?.querySelector('.paragraph-text');
        paragraphText!.innerHTML = this.paragraphHTML;
      }
    }, 0);
  }
}
