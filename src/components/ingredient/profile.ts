import '@material/mwc-button';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { customEvent, setProperty, setTitle } from '../../helper/helper';
import type { ProfileConfig, ProfileInfoConfig } from '../../interfaces/index';
import { profileStyle } from '../../styles/components/ts/profile-style';
import '../error-screen/not-connect-with-server';
import '../ingredient/image';
import '../page-loader/profile-skeleton';

@customElement('c-profile')
export class Profile extends LitElement {
  static styles = [profileStyle];

  public levelColor = {
    '1': 'var(--color-9-600)',
    '2': 'var(--color-11-500)',
    '3': 'var(--color-12-500)',
    '4': 'var(--color-1-500)',
    '5': 'var(--gray-600)',
  };

  @property({
    type: Object,
  })
  loading = false;

  @property({
    type: Object,
  })
  error = false;

  @property()
  hn!: string | number;

  @property()
  vn!: string | number;

  @property()
  photo = 'profile-default-3';

  @property()
  fullName!: string;

  @property({
    type: Object,
  })
  perferred!: {
    text: string | null;
    icon?: string;
  };

  @property({
    type: Object,
  })
  info: Record<string, string> | ProfileInfoConfig[] | null = null;

  @state()
  scrollValue?: string;

  @property()
  language!: string;

  @property({
    type: Object,
  })
  config: ProfileConfig = {
    header: false,
    mapHn: false,
    seeMore: false,
    seeAll: false,
    uploadPhoto: false,
    fitContent: false,
    preferredAction: false,
  };

  @property({ type: Object })
  errorScreenReload = true;

  @property({ type: Object })
  fixedSeeAll = false;

  @property()
  variable?: Record<string, string>;
  // example angular
  // [variable]="{
  //   '--level-color': currentTab === 'general-info' ? 'red' : 'blue'
  // }"

  @property()
  level: '1' | '2' | '3' | '4' | '5' | null = null;

  render() {
    return html`
      <!-- skeleton loader -->
      <style>
        :host {
          --scroll-height: ${this.scrollValue};
          --level-color: ${this.config.uploadPhoto ? 'var(--color-5-400)' : 'var(--status-light-gray)'};
          --calc-height: ${this.config.seeAll ? (this.fixedSeeAll ? '128px' : '190px') : '157px'};
        }

        .bg-level {
          background: var(--level-color);
        }
      </style>
      ${this.error
        ? html`
            <div class="profile-wrapper profile-height error-screen-wrapper">
              <c-not-connect-with-server
                @reload="${() => customEvent(this, 'errorScreenReload', {})}"
                .config="${{ reload: this.errorScreenReload }}"
              ></c-not-connect-with-server>
            </div>
          `
        : this.loading
        ? html`<c-profile-skeleton></c-profile-skeleton>`
        : html`
            <div class="profile-outside-wrapper">
              <!-- profile -->
              <div class="profile-wrapper ${this.config?.fitContent ? '' : 'profile-height'}">
                <!-- HN box -->
                ${this.config?.header
                  ? html` <div class="title-wrapper">
                      <div class="title-text">Patient Info.</div>

                      ${this.vn ? html` <div class="vn-wrapper">VN ${this.vn}</div> ` : undefined}
                      ${this.config?.seeMore
                        ? html`
                            <div class="see-more-wrapper" @click="${() => this.actionEvent('seeMore')}">
                              <div class="see-more-text">See more</div>
                              <c-icon icon="u_external-link-alt"></c-icon>
                            </div>
                          `
                        : undefined}
                    </div>`
                  : undefined}

                <!--patient info box -->
                <div class="patient-info-wrapper">
                  <div class="profile-info-wrapper">
                    <div class="img-wrapper">
                      <div class="photo-wrapper">
                        <c-image
                          class="profile-photo"
                          src="${this.photo || 'profile-default-3'}"
                          height="82px"
                          width="82px"
                        ></c-image>

                        ${this.config?.uploadPhoto && this.level === null
                          ? html` <c-button
                              background="var(--color-5-400)"
                              class="badge-wrapper"
                              type="icon"
                              buttonHeight="26"
                              @click="${() => this.actionEvent('uploadPhoto')}"
                            >
                              <c-icon slot="icon-button" icon="u_camera" color="white" size="12"></c-icon>
                            </c-button>`
                          : undefined}
                        ${this.level ? html` <div class="badge-wrapper bg-level">${this.level}</div> ` : undefined}
                      </div>

                      <div
                        class="shortname-text ${this.config.preferredAction
                          ? 'preferred-action-on'
                          : 'preferred-action-off'}"
                        @click="${() => this.actionEvent('preferred')}"
                      >
                        ${this.perferred?.icon ? html` <c-icon icon="${this.perferred?.icon}"></c-icon>` : undefined}
                        <span>
                          ${this.config.preferredAction ? this.perferred?.text ?? '-' : this.perferred?.text}
                        </span>
                      </div>
                    </div>
                    <div class="all-info-wrapper">
                      <div class="hn-wrapper">
                        <div class="hn-text">HN ${this.hn || '-'}</div>

                        <div class="lang-map-hn-wrapper">
                          ${this.config?.mapHn
                            ? this.hn
                              ? html`
                                  <div class="map-hn-wrapper" @click="${() => this.actionEvent('unlinkHn')}">
                                    <c-icon size="16" icon="u_link-broken"></c-icon>
                                  </div>
                                `
                              : html`
                                  <div class="map-hn-wrapper" @click="${() => this.actionEvent('linkHn')}">
                                    <c-icon size="16" icon="u_link-alt"></c-icon>
                                  </div>
                                `
                            : undefined}
                          ${this.language
                            ? html`<div class="lang-text-${this.language?.toLowerCase()}">${this.language}</div>`
                            : undefined}
                        </div>
                      </div>

                      <div class="name-text">${this.fullName}</div>

                      ${this.renderProfileInfo()}
                    </div>
                  </div>
                </div>
                <!-- TODO: w8 for confirm by design/ba -->
                <div class="content-fixed">
                  <slot name="content-fixed"></slot>
                </div>
                <div class="content-scroll">
                  <slot name="content-scroll"></slot>
                </div>
              </div>
              ${this.config.seeAll
                ? html` <div @click="${() => this.actionEvent('seeAll')}" class="see-all-wrapper">
                    <c-icon icon="u_browser"></c-icon>
                    <span> ดูแบบเต็ม </span>
                  </div>`
                : undefined}
            </div>
          `}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', () => {
      this.resizeProfileSpacing();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', () => {
      this.resizeProfileSpacing();
    });
  }

  renderInfoHTML(title: string, desc: string, line?: string) {
    return desc !== null
      ? html`
          <div class="head-info-wrapper">
            <div class="head-info-text">${title}</div>
            <span style="font-size:14px;-webkit-line-clamp: ${line};" class="${line ? 'info-line' : ''}">${desc}</span>
          </div>
        `
      : undefined;
  }

  renderInfoObject() {
    return html`${Object.entries(this.info!).map(([title, desc]) => this.renderInfoHTML(title, desc))}`;
  }

  renderInfoArray() {
    return html`${(this.info as ProfileInfoConfig[]).map(({ title, desc, line }) =>
      this.renderInfoHTML(title, desc, line)
    )}`;
  }

  renderProfileInfo() {
    return this.info ? (Array.isArray(this.info) ? this.renderInfoArray() : this.renderInfoObject()) : undefined;
  }

  resizeProfileSpacing() {
    const contentScroll = this.shadowRoot?.querySelector('.content-scroll');

    if (contentScroll) {
      this.scrollValue = `${
        // 78 / 38 is bottom spacing of the card
        document.body.clientHeight -
        contentScroll?.getBoundingClientRect()?.top -
        (this.config.seeAll ? 78 + (this.fixedSeeAll ? -9 : 0) : 38)
      }px`;
    }
  }

  updated() {
    this.resizeProfileSpacing();

    if (this.level) {
      const host = this.shadowRoot?.host as HTMLElement;
      host?.style?.setProperty('--level-color', this.levelColor[this.level]);
    }

    if (this.variable) {
      const host = this.shadowRoot?.host as HTMLElement;
      setProperty(this.variable, host);
    }
  }

  actionEvent(event: string): void {
    this.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
      })
    );

    if (event === 'seeMore') {
      setTitle('Patient Profile');
      this.requestUpdate();
    }
  }
}
