import { css } from 'lit';

export const constantColorTheme = css`
  :host {
    /* gray scale */
    --gray-900: #131b39;
    --gray-800: #2a3959;
    --gray-700: #3f527a;
    --gray-600: #556e97;
    --gray-500: #a5b7da;
    --gray-400: #c9d4f1;
    --gray-300: #e7eeff;
    --gray-200: #f5f8ff;
    --gray-100: #ffffff;

    /* neutral */
    --neutral-800: #272727;
    --neutral-700: #393939;
    --neutral-600: #595959;
    --neutral-500: #7a7a7a;
    --neutral-400: #afafaf;
    --neutral-300: #dadada;
    --neutral-200: #f1f1f1;
    --neutral-100: #ffffff;
    /* Theme Colors */
    /* color 1 */

    --color-1-700: #004539;
    --color-1-600: #008b72;
    --color-1-500: #05cba7;
    --color-1-400: #10f0c8;
    --color-1-300: #4df8d9;
    --color-1-200: #8effeb;
    --color-1-100: #defff9;
    /* color 2 */
    --color-2-700: #02393c;
    --color-2-600: #037177;
    --color-2-500: #06b4bd;
    --color-2-400: #07dae5;
    --color-2-300: #68edf4;
    --color-2-200: #acfbff;
    --color-2-100: #c0fafd;

    /* color 3 */
    --color-3-700: #0e595a;
    --color-3-600: #1bb3b5;
    --color-3-500: #53e2e5;
    --color-3-400: #75e8ea;
    --color-3-300: #98eeef;
    --color-3-200: #baf3f5;
    --color-3-100: #e1fdff;

    /* color 4 */
    --color-4-700: #004461;
    --color-4-600: #0088c2;
    --color-4-500: #24bdff;
    --color-4-400: #50caff;
    --color-4-300: #7cd7ff;
    --color-4-200: #a7e5ff;
    --color-4-100: #e2f6ff;

    /* color 5 */
    --color-5-700: #002761;
    --color-5-600: #004ec2;
    --color-5-500: #247cff;
    --color-5-400: #5096ff;
    --color-5-300: #7cb0ff;
    --color-5-200: #a7cbff;
    --color-5-100: #ddebff;

    /* color 6 */
    --color-6-700: #091139;
    --color-6-600: #132273;
    --color-6-500: #1c33ac;
    --color-6-400: #2a46dc;
    --color-6-300: #5f74e5;
    --color-6-200: #94a3ee;
    --color-6-100: #e0e5ff;

    /* color 7 */
    --color-7-700: #160868;
    --color-7-600: #2c11d0;
    --color-7-500: #745ff2;
    --color-7-400: #907ff5;
    --color-7-300: #ac9ff7;
    --color-7-200: #c7bffa;
    --color-7-100: #edeaff;

    /* color 8 */
    --color-8-700: #430d56;
    --color-8-600: #861aac;
    --color-8-500: #ba46e3;
    --color-8-400: #c86be9;
    --color-8-300: #d690ee;
    --color-8-200: #e3b5f4;
    --color-8-100: #faeaff;

    /* color 9 */
    --color-9-700: #510b33;
    --color-9-600: #a31665;
    --color-9-500: #e33396;
    --color-9-400: #e95cab;
    --color-9-300: #ee85c0;
    --color-9-200: #f4add5;
    --color-9-100: #f9d6ea;

    /* color 10 */
    --color-10-700: #67030b;
    --color-10-600: #ce0616;
    --color-10-500: #fa4453;
    --color-10-400: #fb6975;
    --color-10-300: #fc8f98;
    --color-10-200: #fdb4ba;
    --color-10-100: #ffe9ea;

    /* color 11 */
    --color-11-700: #632104;
    --color-11-600: #c64308;
    --color-11-500: #f7773e;
    --color-11-400: #f99265;
    --color-11-300: #faad8b;
    --color-11-200: #fcc9b2;
    --color-11-100: #fde4d8;

    /* color 12 */
    --color-12-700: #584000;
    --color-12-600: #b17f01;
    --color-12-500: #feba0c;
    --color-12-400: #fec83d;
    --color-12-300: #fed66d;
    --color-12-200: #ffe39e;
    --color-12-100: #fff1ce;

    /* status */
    --status-light-gray: #dfe6f7;
    --status-gray: #7386af;
    --status-light-green: #c2f0eb;
    --status-light-blue: #d6f3ff;
    --status-light-violet: #dde5ff;
    --status-light-purple: #ecddff;
    --status-light-purple: #ecddff;
    --status-light-orange: #ffe4c2;
    --status-green: #33cabb;
    --status-blue: #42c6ff;
    --status-violet: #6087ff;
    --status-purple: #b57aff;
    --status-light-pink: #ffdae3;
    --status-pink: #ff7193;
    --status-orange: #ff8c04;
    --status-light-yellow: #fff0cb;
    --status-yellow: #feba0c;

    /* other */
    --blue-1: #316ad9;
    --blue-2: #ebecff;
    --blue-3: #dfe0ff;
    --blue-4: #bfcaff;
    --blue-opacity-1: #d1d0fd54;
    --black-1: #000000;
    --white-1: #ffffff;
    --white-2: #f9fafb;
    --white-3: #e5e6f1;
    --white-5: #8b8b9d;
    --white-opacity-1: #ffffffcc;

    --dark-blue-1: #272a38;
    --dark-blue-2: #131626;
    --dark-blue-3: #576382;
    --dark-blue-opacity-1: #131626;

    --gray-blue-1: #18191e;
    --gray-blue-2: #24262c;

    /* system */
    --system-colors-error: #f3655c;
    --system-colors-error-100: #ffefee;
    --system-colors-error-200: #fedcda;
    --system-colors-error-500: #f3655c;
    --system-colors-error-600: #ce1306;
  }
`;

export const standardTheme = css`
  :host(.light-standard) {
    --cl-title: var(--gray-700);
    --cl-subject: var(--gray-900);
    --cl-text: var(--gray-800);
    --cl-text-2: var(--gray-600);
    --cl-sidebar-title: var(--gray-700);
    --cl-sidebar-text: var(--gray-600);
    --cl-sidebar-active-text: var(--blue-1);
    --cl-icon: var(--black-1);
    --cl-input-disabled: var(--gray-400);
    --bg-body: var(--white-2);
    --bg-content: var(--white-1);
    --bg-sidebar: var(--white-1);
    --bg-opacity-1: var(--white-opacity-1);
    --bg-menu-active: var(--blue-opacity-1);
    --bg-divider: var(--white-3);
    --bg-input: var(--white-1);
    --bg-input-border: var(--gray-400);
    --shadow: 0 4px 16px #666f9f14;
    --shadow-2: 0 0 14px #1514272e;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #f0f0f0;
    --cl-skeleton-load: #dadada;
    --cl-layout-menu-hover: #f0f0f0;
  }

  :host(.dim-standard) {
    --cl-title: var(--white-3);
    --cl-subject: var(--blue-2);
    --cl-text: var(--white-2);
    --cl-text-2: var(--blue-4);
    --cl-sidebar-title: var(--white-2);
    --cl-sidebar-text: var(--white-5);
    --cl-sidebar-active-text: var(--blue-4);
    --cl-icon: var(--white-1);
    --cl-input-disabled: var(--gray-400);
    --bg-body: var(--gray-blue-1);
    --bg-content: var(--gray-blue-2);
    --bg-sidebar: var(--gray-blue-2);
    --bg-opacity-1: var(--dark-blue-opacity-1);
    --bg-menu-active: #5b64ca3d;
    --bg-divider: #514c68;
    --bg-input: var(--dark-blue-1);
    --bg-input-border: var(--dark-blue-3);
    --shadow: 0 4px 16px #666f9f14;
    --shadow-2: 0 0 14px #15142773;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #25242f;
    --cl-skeleton-load: #302f3a;
    --cl-layout-menu-hover: var(--blue-opacity-1);
  }

  :host(.dark-standard) {
    --cl-title: #dfe0ff;
    --cl-subject: white;
    --cl-text: white;
    --cl-sidebar-title: white;
    --cl-sidebar-text: #3f527a;
    --cl-sidebar-active-text: black;
    --cl-text-2: white;
    --cl-icon: white;
    --cl-input-disabled: var(--gray-400);
    --bg-body: black;
    --bg-content: #171717;
    --bg-sidebar: #171717;
    --bg-opacity-1: var(--dark-blue-opacity-1);
    --bg-menu-active: #5b64ca3d;
    --bg-divider: #363651;
    --bg-input: var(--white-1);
    --bg-input-border: var(--dark-blue-3);
    --shadow: 0 4px 16px #000000ab;
    --shadow-2: 0 0 14px #000000bf;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #25242f;
    --cl-skeleton-load: #302f3a;
    --cl-layout-menu-hover: #f0f0f0;
  }
`;

export const warmTheme = css`
  :host(.light-warm) {
    --cl-title: var(--gray-700);
    --cl-subject: var(--gray-900);
    --cl-text: var(--gray-800);
    --cl-sidebar-title: #3f527a;
    --cl-sidebar-text: #3f527a;
    --cl-sidebar-active-text: black;
    --cl-text-2: #7386af;
    --cl-icon: black;
    --cl-input-disabled: var(--gray-400);
    --bg-body: #f9fafb;
    --bg-content: white;
    --bg-sidebar: #d0e8ed;
    --bg-opacity-1: #ffffffcc;
    --bg-menu-active: #d1d0fd54;
    --bg-divider: #e5e6f1;
    --bg-input: var(--white-1);
    --bg-input-border: var(--dark-blue-3);
    --shadow: 0 4px 16px #666f9f14;
    --shadow-2: 0 0 14px #1514272e;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #f0f0f0;
    --cl-skeleton-load: #dadada;
    --cl-layout-menu-hover: #f0f0f0;
  }

  :host(.dim-warm) {
    --cl-title: #dfe0ff;
    --cl-subject: white;
    --cl-text: white;
    --cl-sidebar-title: white;
    --cl-sidebar-text: #3f527a;
    --cl-sidebar-active-text: black;
    --cl-text-2: white;
    --cl-icon: white;
    --cl-input-disabled: var(--gray-400);
    --bg-body: #131b39;
    --bg-content: #2a3245;
    --bg-sidebar: #2a3245;
    --bg-opacity-1: var(--dark-blue-opacity-1);
    --bg-menu-active: #5b64ca3d;
    --bg-divider: #514c68;
    --bg-input: var(--white-1);
    --bg-input-border: var(--dark-blue-3);
    --shadow: 0 4px 16px #666f9f14;
    --shadow-2: 0 0 14px #15142773;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #25242f;
    --cl-skeleton-load: #302f3a;
    --cl-layout-menu-hover: #f0f0f0;
  }

  :host(.dark-warm) {
    --cl-title: #dfe0ff;
    --cl-subject: white;
    --cl-text: white;
    --cl-sidebar-title: white;
    --cl-sidebar-text: #3f527a;
    --cl-sidebar-active-text: black;
    --cl-text-2: white;
    --cl-icon: white;
    --cl-input-disabled: var(--gray-400);
    --bg-body: black;
    --bg-content: #161523;
    --bg-sidebar: #161523;
    --bg-opacity-1: var(--dark-blue-opacity-1);
    --bg-menu-active: #5b64ca3d;
    --bg-divider: #363651;
    --bg-input: var(--white-1);
    --bg-input-border: var(--dark-blue-3);
    --shadow: 0 4px 16px #000000ab;
    --shadow-2: 0 0 14px #000000bf;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #25242f;
    --cl-skeleton-load: #302f3a;
    --cl-layout-menu-hover: #f0f0f0;
  }
`;

export const coolTheme = css`
  :host(.light-cool) {
    --cl-title: #3f527a;
    --cl-subject: black;
    --cl-text: black;
    --cl-sidebar-title: white;
    --cl-sidebar-text: #a5b7da;
    --cl-sidebar-active-text: white;
    --cl-sidebar-active-icon: white;
    --cl-text-2: #7386af;
    --cl-icon: black;
    --cl-input-disabled: var(--gray-400);
    --bg-body: #f9fafb;
    --bg-content: white;
    --bg-sidebar: #341e8f;
    --bg-opacity-1: #ffffffcc;
    --bg-menu-active: #7387fc;
    --bg-divider: #e5e6f1;
    --bg-input: var(--white-1);
    --bg-input-border: var(--dark-blue-3);
    --shadow: 0 4px 16px #666f9f14;
    --shadow-2: 0 0 14px #1514272e;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #f0f0f0;
    --cl-skeleton-load: #dadada;
    --cl-layout-menu-hover: #f0f0f0;
  }

  :host(.dim-cool) {
    --cl-title: #dfe0ff;
    --cl-subject: white;
    --cl-text: white;
    --cl-sidebar-title: white;
    --cl-sidebar-text: #3f527a;
    --cl-sidebar-active-text: black;
    --cl-text-2: white;
    --cl-icon: white;
    --cl-input-disabled: var(--gray-400);
    --bg-body: #131b39;
    --bg-content: #20164e;
    --bg-sidebar: #20164e;
    --bg-opacity-1: var(--dark-blue-opacity-1);
    --bg-menu-active: #5b64ca3d;
    --bg-divider: #514c68;
    --bg-input: var(--white-1);
    --bg-input-border: var(--dark-blue-3);
    --shadow: 0 4px 16px #666f9f14;
    --shadow-2: 0 0 14px #15142773;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #25242f;
    --cl-skeleton-load: #302f3a;
    --cl-layout-menu-hover: #f0f0f0;
  }

  :host(.dark-cool) {
    --cl-title: #dfe0ff;
    --cl-subject: white;
    --cl-text: white;
    --cl-sidebar-title: white;
    --cl-sidebar-text: #3f527a;
    --cl-sidebar-active-text: black;
    --cl-text-2: white;
    --cl-icon: white;
    --cl-input-disabled: var(--gray-400);
    --bg-body: black;
    --bg-content: #1a1c38;
    --bg-sidebar: #1a1c38;
    --bg-opacity-1: var(--dark-blue-opacity-1);
    --bg-menu-active: #5b64ca3d;
    --bg-divider: #363651;
    --bg-input: var(--white-1);
    --bg-input-border: var(--dark-blue-3);
    --shadow: 0 4px 16px #000000ab;
    --shadow-2: 0 0 14px #000000bf;
    --hard-shadow: 0 4px 16px #666f9f14;
    --cl-skeleton-base: #25242f;
    --cl-skeleton-load: #302f3a;
    --cl-layout-menu-hover: #f0f0f0;
  }
`;
