import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './icon';

@customElement('c-text')
export class Text extends LitElement {
  static styles = css`
    ::slotted(p) {
      margin: 0;
    }

    .text-wrapper {
      display: flex;
      column-gap: var(--gap);
      color: var(--text-color);
    }

    .pre-wrapper {
      display: flex;
      font-weight: 400;
      column-gap: 2px;
    }

    .p-wrapper {
      font-weight: var(--p-weight);
      visibility: var(--p-visibility);
      margin-left: var(--p-left);
      margin-right: var(--p-right);
      font-size: var(--p-size);
      color: var(--p-color);
    }

    .post-wrapper {
      margin-left: var(--post-left);
      margin-right: var(--post-right);
    }

    .post-text {
      font-size: var(--post-size);
      color: var(--post-color);
      font-weight: var(--post-weight);
    }

    .slot-wrapper {
      font-weight: 600;
      margin-left: 14px;
      position: relative;
    }

    .dashed-wrapper {
      border-bottom: 1px dashed #2a3959;
      text-decoration: none;
      width: var(--dot-width);
      position: relative;
      bottom: 4px;
    }

    .pick {
      border-bottom: 2px solid var(--gray-800);
    }

    .box-wrapper {
      display: flex;
      column-gap: 10px;
      margin-left: 3px;
    }

    .box-content {
      display: flex;
      column-gap: 10px;
      margin-left: var(--box-left);
      margin-right: var(--box-right);
    }

    .box-text {
      font-size: var(--box-size);
      font-weight: var(--box-weight);
      color: var(--box-color);
    }

    .pre-text {
      margin-left: var(--pre-left);
      margin-right: var(--pre-right);
      color: var(--pre-color);
      font-size: var(--pre-size);
      font-weight: var(--pre-weight);
    }

    .pre-list {
      display: inline;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .pre-list li {
      display: inline;
    }

    .pre-list li::after {
      content: '/';
    }

    .pre-list li:last-child::after {
      content: '';
    }

    .p-hidden {
      visibility: hidden;
    }
  `;

  // color text
  @property()
  c = 'var(--gray-800)';

  // paragraph
  @property()
  p?: string;

  // paragraph left
  @property()
  pc = 'var(--gray-800)';
  // paragraph visibility
  @property()
  pv = 'visible';

  // paragraph size
  @property()
  ps = '16px';

  // paragraph margin-left
  @property()
  pl = 0;

  // paragraph margin-right
  @property()
  pr = 0;

  // paragraph weight
  @property()
  pw = '600';

  // post text
  @property()
  post?: string;

  // post text
  @property()
  postc? = 'var(--gray-800)';

  // post text color
  @property()
  posts? = '16px';

  // post text weight
  @property()
  postw? = '400';

  // post text margin-left
  @property()
  postl? = '0';

  // post text margin-right
  @property()
  postr? = '0';

  // pre text
  @property({
    type: Object,
  })
  pre?: string[];

  // pre right
  @property()
  prer = '0';

  // pre left
  @property()
  prel = '0';

  // pre size
  @property()
  pres = '16px';

  // pre weight
  @property()
  prew = '400';

  // pre color
  @property()
  prec = 'var(--gray-800)';

  // pick box / pre
  @property({
    type: Object,
  })
  pick?: string[];

  // dash line
  @property()
  dot?: string;

  // checkbox
  @property({
    type: Object,
  })
  box?: string[];

  // checkbox right
  @property()
  boxs = '16px';

  // checkbox color
  @property()
  boxc = 'var(--gray-800)';

  // checkbox size
  @property()
  boxr = '0';

  // checkbox weight
  @property()
  boxw = '400';

  // checkbox right
  @property()
  boxl = '0';

  @property()
  gap = '8px';

  @property()
  locale?: string;

  // change language

  public dotTranslate?: string;

  // p traslate
  // public pTraslate?: string;
  public plTranslate?: string;
  public prTranslate?: string;

  // post translate
  public postTranslate?: string;
  public postlTranslate?: string;
  public postrTranslate?: string;

  // box translate
  public boxTranslate: Record<string, string> = {};
  public boxrTranslate?: string;
  public boxlTranslate?: string;

  // pre translate
  public preTranslate: Record<string, string> = {};
  public prerTranslate?: string;
  public prelTranslate?: string;

  render() {
    return html`
      <style>
        :host {
          --text-color: ${this.c};
          --dot-width: ${this.dotTranslate ?? this.dot};
          --gap: ${this.gap};
          --p-visibility: ${this.pv};
          --p-color: ${this.pc};
          --p-left: ${this.plTranslate ?? this.pl};
          --p-right: ${this.prTranslate ?? this.pr};
          --p-size: ${this.ps};
          --p-weight: ${this.pw};
          --box-color: ${this.boxc};
          --box-left: ${this.boxlTranslate ?? this.boxl};
          --box-right: ${this.boxrTranslate ?? this.boxr};
          --box-size: ${this.boxs};
          --box-weight: ${this.boxw};
          --pre-color: ${this.prec};
          --pre-left: ${this.prelTranslate ?? this.prel};
          --pre-right: ${this.prerTranslate ?? this.prer};
          --pre-size: ${this.pres};
          --pre-weight: ${this.prew};
          --post-color: ${this.postc};
          --post-left: ${this.postlTranslate ?? this.postl};
          --post-right: ${this.postr};
          --post-size: ${this.posts};
          --post-weight: ${this.postw};
        }
      </style>
      <div class="text-wrapper">
        <!-- p -->
        <div class="p-wrapper">${this.dataset.pTraslate ?? this.p ?? html`<span class="p-hidden">.</span> `}</div>

        <!-- box -->
        ${this.box
          ? html`
              <div class="box-wrapper">
                ${this.box?.map(
                  t => html`
                    <div class="box-content">
                      <c-icon icon="${this.pick?.includes(t) ? 'form_checked' : 'form_unchecked'}"></c-icon>
                      <div class="box-text">${this.boxTranslate?.[t] ?? t}</div>
                    </div>
                  `
                )}
              </div>
            `
          : undefined}

        <!-- pre -->
        ${this.pre
          ? html`
              <ul class="pre-list">
                ${this.pre?.map(
                  pre => html`
                    <li>
                      <span class="${this.pick?.includes(pre) ? 'pick' : ''} pre-text">
                        ${this.preTranslate[pre] ?? pre}
                      </span>
                    </li>
                  `
                )}
              </ul>
            `
          : undefined}
        ${this.dot
          ? html` <div class="dashed-wrapper">
              <div class="slot-wrapper">
                <slot></slot>
              </div>
            </div>`
          : undefined}

        <!-- post -->
        ${this.post ? html`<div class="post-wrapper post-text">${this.postTranslate ?? this.post}</div>` : undefined}
      </div>
    `;
  }
}
