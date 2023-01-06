import { css } from 'lit';

export const standardThemeDisplay = css`
  :host(.light-standard-display) {
    --dp-bg-body: #f9fafb;
    --dp-bg-sidebar: #fff;
    --dp-bg-content: #fff;
    --dp-cl-content: #f4f4f4;
    --dp-cl-title: #e4e3ed;
    --bg-profile: #e4e0f4;
  }

  :host(.dim-standard-display) {
    --dp-bg-body: #181818;
    --dp-bg-sidebar: #313335;
    --dp-bg-content: #313335;
    --dp-cl-content: #7386af;
    --dp-cl-title: #869bc7;
    --bg-profile: #5c7ec8;
  }

  :host(.dark-standard-display) {
    --dp-bg-body: #000000;
    --dp-bg-sidebar: #171717;
    --dp-bg-content: #171717;
    --dp-cl-content: #415279;
    --dp-cl-title: #6c80ac;
    --bg-profile: #465e90;
  }
`;

export const warmThemeDisplay = css`
  :host(.light-warm-display) {
    --dp-bg-body: #f9fafb;
    --dp-bg-sidebar: #d0e8ed;
    --dp-bg-content: #fff;
    --dp-cl-content: #f4f4f4;
    --dp-cl-title: #e4e3ed;
    --bg-profile: #e4e0f4;
  }

  :host(.dim-warm-display) {
    --dp-bg-body: #131b39;
    --dp-bg-sidebar: #2a3245;
    --dp-bg-content: #2a3245;
    --dp-cl-content: #7386af;
    --dp-cl-title: #869bc7;
    --bg-profile: #5c7ec8;
  }

  :host(.dark-warm-display) {
    --dp-bg-body: #000000;
    --dp-bg-sidebar: #1d1e2b;
    --dp-bg-content: #1d1e2b;
    --dp-cl-content: #415279;
    --dp-cl-title: #6c80ac;
    --bg-profile: #465e90;
  }
`;

export const coolThemeDisplay = css`
  :host(.light-cool-display) {
    --dp-bg-body: #f9fafb;
    --dp-bg-sidebar: #43318a;
    --dp-bg-content: #fff;
    --dp-cl-content: #f4f4f4;
    --dp-cl-title: #e4e3ed;
    --bg-profile: #e4e0f4;
  }

  :host(.dim-cool-display) {
    --dp-bg-body: #131b39;
    --dp-bg-sidebar: #2a3959;
    --dp-bg-content: #2a3959;
    --dp-cl-content: #7386af;
    --dp-cl-title: #869bc7;
    --bg-profile: #5c7ec8;
  }

  :host(.dark-cool-display) {
    --dp-bg-body: #000000;
    --dp-bg-sidebar: #1a1c38;
    --dp-bg-content: #1a1c38;
    --dp-cl-content: #415279;
    --dp-cl-title: #6c80ac;
    --bg-profile: #465e90;
  }
`;
