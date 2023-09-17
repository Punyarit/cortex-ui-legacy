/* eslint-disable */
import { html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import ui from '../../functions';
import { checkBrowser, customEvent, firstParam, setBrowserTabName, timeout } from '../../helper/helper';
import { SideMenu } from '../../interfaces/index';
import { layoutStyle } from '../../styles/components/ts/layout-style';
import '../ingredient/button';
import '../ingredient/color-theme';
import '../ingredient/icon';
import '../ingredient/image';
import '../ingredient/radio';
import '../ingredient/theme-example';
import '../ingredient/tooltip';
import '../template/display-setting-dialog';
import './dropdown';
@customElement('c-layout')
export class Layout extends LitElement {
  static styles = [layoutStyle];

  @property({ type: Object })
  userMenus = [];

  @state()
  private menus = [
    {
      text: 'ออกจากระบบ',
      action: 'logOut',
      icon: 'log-out',
    },
  ];

  @property()
  startScreen = false;

  @property()
  dark?: boolean;

  @property()
  logoSrc?: string;

  @property({
    type: Array,
  })
  sideMenu: SideMenu[] = [];

  @property()
  userGivenName?: string;

  @property()
  imgProfile?: string;

  @property()
  timing?: string;

  @state()
  titleName?: string;

  @property()
  titlePageName?: string;

  @state()
  overflow = 'overlay';

  @property()
  projectName?: string;

  @property({
    type: Array,
  })
  locationText?: string[];

  @property()
  sideBarWidth = '308px';

  @state()
  displayDialog = false;

  @state()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timerInterval: any;

  @property()
  service?: string;

  @property()
  header = true;

  @state()
  isFullScreen = false;

  // TODO: w8 for improve
  @property()
  config = {
    displaySetting: false,
  };

  @property({
    type: Object,
  })
  locationEvent = false;

  @property()
  titleHeight = '64px';
  // old value is 80px

  @property()
  activePath?: string;

  @property({ type: Object })
  manualActivePath = false;

  @property()
  forcedTitleName?: string;

  @property({ type: Object })
  sideBarHidden = false;

  @state()
  isLocationEllipsis = false;

  @property({ type: Object })
  isIframeDialogOpen = false;

  @property({ type: String })
  iframeDialogBackdropDuration = 200;

  private iframeTimeout?: unknown;

  private iframeDialogBackdrop?: {
    title: HTMLElement;
    sidebar: HTMLElement;
  };

  render() {
    return html`
      <style>
        /* dynamic css variable */
        :host {
          --overflow: ${this.overflow};
          --sideBarWidth: ${this.sideBarWidth};
          --sidebar-margin-left: ${this.isFullScreen || this.sideBarHidden ? '0' : '64px'};
          --width-calc-viewport: ${this.isFullScreen ? '64px' : '128px'};
          --page-height-calc: ${!this.header || this.isFullScreen ? '0px' : '66px'};
          --title-height: ${this.titleHeight};
          --iframeDialogBackdropDuration: ${this.iframeDialogBackdropDuration}ms;
        }
      </style>

      <div class="isIframeDialog-title"></div>
      <div class="isIframeDialog-sidebar"></div>
      <div class="layout-wrapper">
        <!-- sidebar -->
        ${this.isFullScreen
          ? undefined
          : this.sideBarHidden
          ? undefined
          : html`<div hidden class="sidebar-wrapper" @mouseleave="${this.collapseSidebar}">
              <div>
                <div class="menu-wrapper-project">
                  <c-image
                    class="img-logo"
                    .draggable="${false}"
                    style="z-index:1"
                    width="48px"
                    height="51px"
                    src="${this.logoSrc}"
                  ></c-image>
                  <div class="project-name-wrapper">
                    <span class="menu-text project-text"> ${this.projectName} </span>
                  </div>
                </div>

                <div class="menu-list-wrapper">
                  ${this.sideMenu?.map(menuValue => {
                    return html`
                      <div class="menu-wrapper-outside">
                        <div
                          class="menu-wrapper ${(
                            this.activePath
                              ? menuValue.name.toLowerCase() === this.activePath?.toLowerCase()
                              : menuValue?.active?.some(
                                  menu => menu?.replace(/-/g, ' ') === this.titleName?.toLowerCase()
                                ) || this.titleName?.toLowerCase() === menuValue.name.toLowerCase()
                          )
                            ? 'menu-active'
                            : ''}"
                          @click="${() => this.selectMenu(menuValue)}"
                        >
                          <c-tooltip message="${menuValue.name}" position="center">
                            <div class="icon-wrapper">
                              <c-icon size="24" icon="${menuValue.icon}" style="position:relative">
                                ${menuValue.isNotice ? html`<div class="menu-notification"></div>` : undefined}
                              </c-icon>
                            </div>
                          </c-tooltip>
                          <span class="menu-text">${menuValue.name}</span>
                        </div>
                      </div>
                    `;
                  })}
                </div>
              </div>

              <div class="menu-bottom-wrapper">
                <c-button type="icon" buttonHeight="48" @click="${this.expandMenu}">
                  <c-icon id="chevron-right-toggle" slot="icon-button" icon="chevron-right" color="#A5B7DA"></c-icon>
                </c-button>
              </div>
            </div>`}

        <!-- content -->
        <div class="content-wrapper">
          ${!this.header || this.isFullScreen
            ? undefined
            : html` <div class="titlebar-wrapper">
                <div class="title-name-text">${this.forcedTitleName || this.titlePageName || this.titleName}</div>
                <div class="profile-title-wrapper">
                  <span style="color:#A5B7DA"> ${this.timing} </span>

                  ${this.locationText
                    ? html`
                        <c-tooltip
                          message="${this.isLocationEllipsis ? `${this.locationText[0]}, ${this.locationText[1]}` : ``}"
                        >
                          <div
                            class="zone-wrapper ${this.locationEvent ? 'location-btn' : ''}"
                            @click="${this.onLocationEvent}"
                          >
                            <c-icon icon="location-marker" color="#7386af"></c-icon>
                            <div class="location-text-wrapper">${this.locationText[0]}, ${this.locationText[1]}</div>
                          </div>
                        </c-tooltip>
                      `
                    : undefined}
                  <c-dropdown type="menu">
                    <c-button type="flat" padding="0" buttonHeight="48">
                      <div class="profile-wrapper">
                        <c-image height="30px" width="30px" src="profile-default-1"></c-image>
                        <span class="username-text" style="color:var(--cl-text)">${this.userGivenName}</span>
                        <c-icon size="12" icon="chevron-down"></c-icon>
                      </div>
                    </c-button>

                    <div slot="dropdown" class="layout-menu-wrapper">
                      <!--TODO: profile info -->

                      ${this.menus.map(
                        ({ action, icon, text }) => html`
                          <div class="layout-menu-item" @click="${() => this.menuAction(action)}">
                            <c-icon icon="${icon}"></c-icon>
                            <span>${text}</span>
                          </div>
                        `
                      )}
                    </div>
                  </c-dropdown>
                </div>
              </div>`}

          <div class="content-page-wrapper">
            <slot></slot>
          </div>
        </div>
      </div>
      <c-display-setting-dialog
        @displayDialogClose="${(e: CustomEvent) => this.displayDialogClose(e)}"
        .displayDialog="${this.displayDialog}"
      ></c-display-setting-dialog>
    `;
  }

  onLocationEvent() {
    this.locationEvent &&
      this.dispatchEvent(
        new CustomEvent('location', {
          bubbles: true,
        })
      );
  }

  noticeMenu(menuName: string, isNotice = true) {
    this.sideMenu.forEach((menu, index) => {
      if (menuName === menu.name.toLowerCase()) {
        this.sideMenu[index].isNotice = isNotice;
        this.requestUpdate('sideMenu');
      }
    });
  }

  displayDialogClose(e: CustomEvent) {
    this.displayDialog = e.detail.open;
  }

  setActiveSidebar(path: string) {
    this.activePath = path;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.timerInterval);
  }

  displayDialogOpen() {
    this.displayDialog = true;
  }

  menuAction(action: string | Function) {
    if (typeof action === 'function') {
      action();
    } else {
      switch (action) {
        case 'setDisplay':
          this.displayDialogOpen();
          break;

        case 'logOut':
          localStorage.removeItem('theme');
          this.onDisplatchEvent(action);
          break;

        default:
          this.onDisplatchEvent(action);
          break;
      }
    }
  }

  onDisplatchEvent(action: string) {
    this.dispatchEvent(
      new CustomEvent(action, {
        detail: {
          action,
        },
        bubbles: true,
      })
    );
  }

  async collapseSidebar() {
    await timeout(250);
    const menuWrapper = this.shadowRoot?.querySelector('.sidebar-wrapper');
    const chevronRight = this.shadowRoot?.querySelector('#chevron-right-toggle');
    const menuTextAll = this.shadowRoot?.querySelectorAll('.menu-text');
    const projectNameText = this.shadowRoot?.querySelector('.project-text');
    const widthOfProjectName = projectNameText?.getBoundingClientRect()?.width;

    if (menuWrapper && chevronRight && menuTextAll && projectNameText && widthOfProjectName) {
      chevronRight?.classList?.remove('menu-chevron-rotate');
      menuWrapper?.classList?.remove('expanded-menu');
      menuTextAll?.forEach(menuText => menuText?.classList?.remove('show-menu-text'));
      if (widthOfProjectName > 235) {
        projectNameText?.classList?.remove('project-too-long-text');
      } else if (widthOfProjectName > 200) {
        projectNameText?.classList?.remove('project-long-text');
      }
    }
  }

  private observeDom() {
    let previousUrl = '';
    const observer = new MutationObserver(() => {
      if (location.pathname !== previousUrl) {
        this.setPathState(previousUrl);
        previousUrl = location.pathname;
        this.titleName = firstParam()?.replace(/-/g, ' ');
      }
    });

    const config = { subtree: true, childList: true };
    observer.observe(this, config);
  }

  private setPathState(previousUrl: string) {
    if (previousUrl) {
      localStorage.setItem('c-layout-previousUrl', previousUrl);
    } else {
      const currentUrl = localStorage.getItem('c-layout-currentUrl');
      localStorage.setItem('c-layout-previousUrl', currentUrl || '');
    }
    localStorage.setItem('c-layout-currentUrl', location.pathname);
  }

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('userMenus')) {
      this.menus.unshift(...this.userMenus);
    }

    super.willUpdate(_changedProperties);
  }

  updated() {
    this.iframeDialogOpen();
  }

  iframeDialogOpen() {
    if (this.iframeTimeout) {
      clearTimeout(this.iframeTimeout as number);
    }
    if (this.isIframeDialogOpen) {
      this.createIframeDialogBackdrop();
      this.setIframeBackdropClassList('add');
      this.setiframeDialogBackdropOpacity('1');
    } else if (this.iframeDialogBackdrop?.title.classList.contains('iframe-dialog-background-title')) {
      this.setiframeDialogBackdropOpacity('0');
      this.iframeTimeout = setTimeout(() => {
        this.setIframeBackdropClassList('remove');
      }, this.iframeDialogBackdropDuration);
    }
  }

  setIframeBackdropClassList(classList: 'add' | 'remove') {
    if (!this.iframeDialogBackdrop?.sidebar) return;
    this.iframeDialogBackdrop.sidebar.classList[classList]('iframe-dialog-background-sidebar');
    this.iframeDialogBackdrop.title.classList[classList]('iframe-dialog-background-title');
  }

  setiframeDialogBackdropOpacity(opaicty: '0' | '1') {
    if (!this.iframeDialogBackdrop?.sidebar) return;
    this.iframeDialogBackdrop.sidebar.style.opacity = opaicty;
    this.iframeDialogBackdrop.title.style.opacity = opaicty;
  }

  createIframeDialogBackdrop() {
    if (this.iframeDialogBackdrop) return;
    this.iframeDialogBackdrop = {
      sidebar: this.shadowRoot?.querySelector('.isIframeDialog-sidebar') as HTMLElement,
      title: this.shadowRoot?.querySelector('.isIframeDialog-title') as HTMLElement,
    };
  }

  async firstUpdated() {
    setTimeout(() => {
      this.noticeMenu('home');
      console.log('layout.js |this.sideBar| = ', this.sideMenu);
    }, 2000);
    this.observeDom();
    if (this.locationText) {
      this.checkLocationTextEllipsis();
    }

    if (this.config.displaySetting) {
      this.menus.unshift({
        text: 'การแสดงผล',
        action: 'setDisplay',
        icon: 'layer-sidebar',
      });
    }

    if (this.startScreen) {
      const layoutWrapper = this.shadowRoot?.querySelector('.layout-wrapper');
      layoutWrapper?.classList?.add('hide');

      // when c-start-screem execute it will give start-screen-animated

      const startScreenAnimated = sessionStorage.getItem('start-screen-animated');
      const imgLogo = this.shadowRoot?.querySelector('.img-logo');

      if (startScreenAnimated === 'move-to-slider') {
        imgLogo?.classList?.add('hide');
        timeout(1200).then(() => {
          imgLogo?.classList?.remove('hide');
        });
      }
      timeout(0).then(() => {
        layoutWrapper?.classList?.remove('hide');
      });
    }

    // set external service for micro frontend
    const params = new URL(document.location.href).searchParams;
    const screen = params.get('screen');
    this.isFullScreen = screen === 'full' ? true : false;

    // set overflow
    this.setOverflowByBrowser();

    // set titlebar
    !this.titlePageName && this.setTitleBarName();
    this.activeSideMenu();
    this.requestUpdate();
  }

  checkLocationTextEllipsis() {
    setTimeout(() => {
      const locationTextWrapper = this.shadowRoot?.querySelector<HTMLElement>('.location-text-wrapper');
      if (locationTextWrapper) {
        this.isLocationEllipsis = locationTextWrapper.offsetWidth < locationTextWrapper.scrollWidth;
      }
    }, 0);
  }

  activeSideMenu() {
    const pageName = firstParam()?.replace(/-/g, ' ');
    setBrowserTabName(pageName);
    this.titleName = pageName;
  }

  expandMenu() {
    const menuWrapper = this.shadowRoot?.querySelector('.sidebar-wrapper');
    const chevronRight = this.shadowRoot?.querySelector('#chevron-right-toggle');
    const menuTextAll = this.shadowRoot?.querySelectorAll('.menu-text');
    const projectNameText = this.shadowRoot?.querySelector('.project-text');
    const widthOfProjectName = projectNameText?.getBoundingClientRect()?.width;

    if (menuWrapper && chevronRight && menuTextAll && projectNameText && widthOfProjectName) {
      chevronRight?.classList?.toggle('menu-chevron-rotate');
      menuWrapper?.classList?.toggle('expanded-menu');
      menuTextAll?.forEach(menuText => menuText?.classList?.toggle('show-menu-text'));

      if (widthOfProjectName > 235) {
        projectNameText?.classList?.toggle('project-too-long-text');
      } else if (widthOfProjectName > 200) {
        projectNameText?.classList?.toggle('project-long-text');
      }
    }
  }

  setTitleBarName() {
    this.titleName = firstParam()?.replace(/-/g, ' ');
    setBrowserTabName(this.titleName);
  }

  setOverflowByBrowser() {
    switch (checkBrowser()) {
      case 'Chrome':
      case 'Opera':
        this.overflow = 'overlay';
        break;

      // other browsers except chrome or chromium
      default:
        this.overflow = 'auto';
        break;
    }
  }

  // Event Function
  selectMenu(menu: SideMenu): void {
    if (menu.path === '/' + firstParam()) return;
    if (menu?.disabled) {
      customEvent(this, 'getPath', {
        path: menu.path,
        service: menu.service ?? '',
      });
      return;
    }

    this.setActiveSidebar('');

    setBrowserTabName(menu.name);
    setTimeout(() => {
      this.titleName = menu.name;
    }, 200);
    this.forcedTitleName = '';

    ui.transition(
      'transition-page',
      () => {
        customEvent(this, 'getPath', {
          path: menu.path,
          service: menu.service ?? '',
        });
      },
      menu.path
    );
  }
}
