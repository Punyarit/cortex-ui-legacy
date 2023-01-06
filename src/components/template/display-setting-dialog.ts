import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../ingredient/color-theme';
import '../ingredient/divider';
import '../kit/dialog';

@customElement('c-display-setting-dialog')
export class DisplaySettingDialog extends LitElement {
  // TODO: back to edit this variable below need to fix to theme variable
  @state()
  colorTheme = [
    {
      palette: ['#06b4bd', '#68edf4', '#c0fafd'],
      text: 'Standard',
      value: 'standard',
      checked: false,
    },
    {
      palette: ['#fa4453', '#fc8f98', '#ffe9ea'],
      text: 'Warm',
      value: 'warm',
      checked: false,
    },
    {
      palette: ['#1c33ac', '#5f74e5', '#e0e5ff'],
      text: 'Cool',
      value: 'cool',
      checked: false,
    },
  ];

  @state()
  bgTheme = [
    {
      text: 'เปิดไฟ',
      value: 'light',
      checked: false,
    },
    {
      text: 'หรี่ไฟ',
      value: 'dim',
      checked: false,
    },
    {
      text: 'ปิดไฟ',
      value: 'dark',
      checked: false,
    },
  ];

  @property({
    type: Object,
  })
  displayDialog = false;

  @state()
  bgThemeClassName: string[] = [];

  @property()
  zIndex = 1000;

  @state()
  fontTheme = [
    {
      value: 'tiny',
      checked: false,
    },
    {
      value: 'small',
      checked: false,
    },
    {
      value: 'medium',
      checked: false,
    },
    {
      value: 'large',
      checked: false,
    },
    {
      value: 'huge',
      checked: false,
    },
  ];

  render() {
    return html`
      <style>
        /* .test {
          background: linear-gradient(225deg, #247cff 0%, #1c33ac 100%);
        } */
      </style>
      <c-dialog
        id="display-setting"
        padding="30px 0"
        zIndex="${this.zIndex}"
        @status="${(e: CustomEvent) => this.setDisplayDialog(e)}"
        .open="${this.displayDialog}"
      >
        <c-wrap styles="width:940px" d="flex" layout="column" aligns="center" rowGap="12px">
          <div class="title">การแสดงผล</div>
          <div class="sub-title">จัดการพื้นหลัง ธีมสี และขนาดตัวอักษร</div>

          <c-wrap type="fluid" mt="12px">
            <!-- Background Theme -->

            <div class="section">
              <div class="content-title">พื้นหลัง</div>
              <c-wrap d="flex" justify="space-between" mt="16px">
                ${this.bgTheme.map(
                  ({ text, value, checked }, index) => html`
                    <div @click="${() => this.selectBgTheme(value)}" class="theme-content-wrapper">
                      <c-theme-example class="${this.bgThemeClassName[index]}"></c-theme-example>
                      <c-radio
                        .isChecked="${checked}"
                        id="radio-${value}"
                        group="background"
                        label="${text}"
                        type="column"
                        gap="8px"
                      >
                      </c-radio>
                    </div>
                  `
                )}
              </c-wrap>
            </div>

            <c-divider gap="40px" size="2px"></c-divider>

            <!-- Color Theme -->
            <div class="section">
              <div class="content-title">ธีมสี</div>
              <c-wrap d="flex" justify="space-around" mt="16px">
                ${this.colorTheme.map(
                  ({ palette, value, checked, text }) => html`
                    <div @click="${() => this.selectColorTheme(value)}" class="theme-content-wrapper">
                      <c-color-theme .palette="${palette}" style="margin: 18px 18px 0"></c-color-theme>
                      <c-radio
                        .isChecked="${checked}"
                        id="radio-${value}"
                        group="background"
                        label="${text}"
                        type="column"
                        gap="8px"
                      >
                      </c-radio>
                    </div>
                  `
                )}
              </c-wrap>
            </div>

            <c-divider gap="40px" size="2px"></c-divider>

            <!-- Font Theme -->
            <div class="section">
              <div class="content-title">ขนาดตัวอักษร</div>
              <div class="font-theme-wrapper">
                <div class="font-start">Aa</div>
                ${this.fontTheme.map(
                  ({ checked, value }, index) => html`
                    <c-radio
                      style="transform:scale(1.2)"
                      .isChecked="${checked}"
                      @click="${() => this.selectFontTheme(value, index)}"
                    >
                    </c-radio>
                    <div class="line-font-theme" ?hidden="${index === this.fontTheme.length - 1}"></div>
                  `
                )}
                <div class="font-end">Aa</div>
              </div>
              <!-- Font Theme Example -->
              <div class="font-theme-wrapper">
                <div class="main-text-wrapper">
                  <c-image .draggable="${false}" src="logo-cortex-small" width="78px"></c-image>
                  <div class="font-theme-text-wrapper">
                    <div class="font-theme-title">Powered by Cortex</div>
                    <div class="font-theme-sub-title">
                      Cortex is Modern cloud-based healthcare platform for hospital.
                    </div>
                  </div>
                </div>
                <div class="font-theme-text">
                  &emsp; We help healthcare providor transforming healthcare delivery for better health, better care and
                  better community
                </div>
              </div>
            </div>
          </c-wrap>
        </c-wrap>
      </c-dialog>
    `;
  }

  firstUpdated() {
    let themeValue: string;
    const theme = localStorage.getItem('theme');
    if (theme) {
      themeValue = theme;
    } else {
      const ctheme = document.body?.querySelector('c-theme')?.className;
      themeValue = ctheme ?? 'light-standard tiny';
    }
    const [bgAndColor, font] = themeValue.split(' ');
    const [bg, color] = bgAndColor.split('-');
    this.setThemeExample(color);
    this.selectColorTheme(color);
    this.selectBgTheme(bg);
    this.selectFontTheme(font);
    this.requestUpdate();
  }

  setDisplayDialog(e: CustomEvent) {
    this.displayDialog = e.detail.open;
    this.dispatchEvent(
      new CustomEvent('displayDialogClose', {
        detail: {
          open: false,
        },
        bubbles: true,
      })
    );
  }

  selectColorTheme(color: string) {
    this.setThemeExample(color);

    const newColor = [...this.colorTheme];
    for (const [index, value] of newColor.entries()) {
      value.checked = color === newColor[index].value;
    }
    this.colorTheme = newColor;
    this.changeTheme(color, 0, 1);
  }

  // select theme
  setThemeExample(color?: string) {
    this.bgThemeClassName = ['light', 'dim', 'dark'].map(theme => `${theme}-${color}-display`);
  }

  // FIX: ChangeTheme ต้องไปเปลี่ยน class ที่ component theme
  changeTheme(theme: string, bgIndex: number, colorIndex = 0, fontIndex = 0) {
    const ctheme = document.body.querySelector('c-theme');
    const layoutClassName = ctheme?.className.split(' ');
    const newTheme = layoutClassName?.[bgIndex]?.split('-');

    if (ctheme && layoutClassName && newTheme) {
      newTheme[colorIndex] = theme;
      const newClassName = newTheme.toString().replace(/\s*,\s*|\s+,/g, '-');
      layoutClassName[fontIndex] = newClassName;
      const themeClassName = layoutClassName.toString().replace(/\s*,\s*|\s+,/g, ' ');
      ctheme.className = themeClassName;
      localStorage.setItem('theme', themeClassName);
    }
  }

  selectFontTheme(font: string, index = -1) {
    const newFont = [...this.fontTheme];
    for (const [index, value] of newFont.entries()) {
      value.checked = font === newFont[index].value;
    }
    this.fontTheme = newFont;

    const lineFontTheme = this.shadowRoot?.querySelectorAll('.line-font-theme');
    if (lineFontTheme) {
      lineFontTheme.forEach((res, i) => {
        if (index > i) {
          res.classList.add('font-checked');
        } else {
          res.classList.remove('font-checked');
        }
      });

      this.changeTheme(font, 1, 0, 1);
    }
  }

  selectBgTheme(bg: string) {
    const newBg = [...this.bgTheme];
    for (const [index, value] of newBg.entries()) {
      value.checked = bg === newBg[index].value;
    }
    this.bgTheme = newBg;
    this.changeTheme(bg, 0);
  }
}
