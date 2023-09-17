import { css } from 'lit';
export const layoutStyle = css `
  .layout-wrapper {
    background-color: var(--bg-body);
    transition: background-color 0.75s ease-in;
    height: 100%;
    display: flex;
    transition: 1.5s ease;
    overflow: hidden;
    opacity: 1;
  }

  .menu-notification {
    width: 10px;
    height: 10px;
    background-color: #ce1306;
    position: absolute;
    border-radius: 50%;
    right: 0;
    top: 0;
    border: 1px solid white;
  }

  .isIframeDialog-title,
  .isIframeDialog-sidebar {
    transition: opacity var(--iframeDialogBackdropDuration);
    opacity: 0;
  }

  .iframe-dialog-background-title {
    transition: opacity var(--iframeDialogBackdropDuration);
    opacity: 1;
    position: absolute;
    top: 0px;
    z-index: 101;
    left: 64px;
    height: 64px;
    width: calc(100% - 64px);
    background-color: #29385980;
  }

  .iframe-dialog-background-sidebar {
    transition: opacity var(--iframeDialogBackdropDuration);
    opacity: 1;
    position: absolute;
    top: 0px;
    z-index: 101;
    left: 0px;
    width: 64px;
    height: 100%;
    background-color: #29385980;
  }

  .location-text-wrapper {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    display: flex;
    align-items: center;
  }

  .location-btn {
    transition: background 0.125s;
    cursor: pointer;
    user-select: none;
  }

  .username-text {
    font-size: var(--fs-14);
  }

  .img-logo {
    opacity: 1;
    transition: 0.25s ease;
  }

  .hide {
    opacity: 0;
  }

  .section {
    padding: 0 40px;
  }

  .sidebar-wrapper {
    height: 100%;
    padding: 9px 7px;
    transition: var(--theme-bg-transition), var(--theme-shadow-transition), width 0.25s ease;
    background-color: var(--bg-sidebar);
    width: 64px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 24px;
    box-sizing: border-box;
    position: fixed;
    z-index: 100;
    overflow: hidden;
  }

  .expanded-menu {
    width: var(--sideBarWidth);
  }

  .menu-list-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    margin-top: 32px;
  }

  .menu-bottom-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    transition: 0.25s;
  }

  .menu-chevron-rotate {
    transform: rotate(180deg);
  }

  .menu-wrapper-outside {
    display: flex;
    align-items: center;
  }
  .menu-text {
    white-space: pre;
    font-size: 20px;
    opacity: 0;
    transition: opacity 0.25s;
    font-weight: 600;
  }
  .show-menu-text {
    opacity: 1;
  }
  .titlebar-wrapper {
    height: var(--title-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
  }
  .content-wrapper {
    width: 100%;
    margin-left: var(--sidebar-margin-left);
  }

  .zone-wrapper {
    color: #7386af;
    background: #e7eeff;
    display: flex;
    column-gap: 12px;
    padding: 2px 12px;
    border-radius: 8px;
    cursor: default;
  }

  .location-btn:hover {
    background: #e0e9ff;
  }

  .location-btn:active {
    background: #d9e4ff;
  }

  .content-page-wrapper {
    height: calc(100% - var(--page-height-calc));
    position: relative;
    overflow: hidden;
  }

  .content-page-scroll {
    height: 100%;
    overflow-y: overlay;
  }

  .icon-wrapper {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
  }

  .menu-wrapper {
    min-height: 44px;
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 4px 0;
    overflow: hidden;
    color: var(--cl-sidebar-text);
    user-select: none;
    transition: background 0.25s ease;
  }

  .menu-wrapper:active {
    background: #646fe954 !important;
  }

  .menu-wrapper:hover {
    background: var(--bg-menu-active);
    color: var(--cl-sidebar-active-text) !important;
  }

  .menu-wrapper-project {
    display: flex;
    align-items: center;
    /* column-gap: 28px; */
    position: relative;
    overflow: hidden;
  }

  .project-text {
    font-size: 32px;
    font-weight: 600;
    transition: opacity 0.25s !important;
  }

  .project-long-text {
    font-size: 28px !important;
    margin-left: 34px;
  }

  .project-too-long-text {
    font-size: 28px !important;
    margin-left: 62px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 235px;
  }

  .project-name-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    padding-bottom: 4px;
  }

  .menu-active {
    color: var(--cl-sidebar-active-text) !important;
    background: var(--bg-menu-active);
  }

  .title-name-text {
    color: var(--cl-title);
    transition: var(--theme-cl-transition);

    transition: color 0.75s ease-in;
    font-size: 28px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .profile-wrapper {
    display: flex;
    align-items: center;
    column-gap: 14px;
  }

  .profile-title-wrapper {
    display: flex;
    align-items: center;
    column-gap: 12px;
    font-size: var(--fs-14);
  }

  .profile-menu-item {
    display: flex;
    column-gap: 12px;
  }

  .profile-dropdown-wrapper {
    padding: 24px;
  }

  .layout-menu-wrapper {
    width: 240px;
    font-family: var(--font-family);
    background-color: var(--bg-content);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .layout-menu-item {
    padding: 16px 24px;
    display: flex;
    column-gap: 24px;
    cursor: pointer;
    color: var(--cl-title);
    transition: background-color 0.125s ease;
  }

  .layout-menu-item:hover {
    background: var(--cl-layout-menu-hover);
  }

  .project-text {
    color: var(--cl-sidebar-title) !important;
  }
`;
//# sourceMappingURL=layout-style.js.map