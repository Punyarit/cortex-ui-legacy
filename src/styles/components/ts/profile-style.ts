import { css } from 'lit';

export const profileStyle = css`
  .error-screen-wrapper {
    display: grid;
    place-items: center;
  }

  .info-line {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 114px;
  }

  .error-screen-wrapper c-not-connect-with-server {
    margin-bottom: 40%;
  }

  .vn-wrapper {
    border: 1px solid var(--gray-300);
    border-radius: 4px;
    padding: 0px 8px;
    font-size: var(--fs-14);
  }

  .profile-outside-wrapper {
    background: var(--bg-content);
    box-shadow: var(--shadow);
    border-radius: 16px;
  }
  .see-all-wrapper {
    color: var(--color-5-500);
    display: flex;
    column-gap: 8px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: color 0.125s;
    user-select: none;
    padding: 6px 0;
  }
  .see-all-wrapper:active {
    color: var(--color-5-600);
  }
  .profile-wrapper {
    width: 320px;
    transition: var(--theme-bg-transition), var(--theme-cl-transition);
    overflow: hidden;
  }

  .profile-height {
    height: calc(100vh - var(--calc-height));
  }

  .title-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #e7eeff;
  }
  .title-text {
    color: #a5b7da;
  }

  .see-more-text {
    font-size: var(--fs-14);
  }

  .patient-info-wrapper {
    padding: 6px 12px 12px 20px;
  }
  .profile-info-wrapper {
    display: flex;
    column-gap: 12px;
  }

  .hn-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hn-text {
    color: #2a3959;
    background: #e7eeff;
    border-radius: 4px;
    padding: 2px 8px;
  }

  .lang-text-en {
    color: #2a3959;
    background: #fff1ce;
    padding: 4px;
    border-radius: 50%;
  }

  .lang-text-th {
    color: #2a3959;
    background: #d6f3ff;
    padding: 4px;
    border-radius: 50%;
  }

  .all-info-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    width: 100%;
  }
  .info-wrapper {
    background: rgba(196, 201, 231, 0.14);
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    height: 25px;
  }
  .info-text {
    display: flex;
    justify-content: space-between;
    padding: 4px 12px;
  }

  .info-text-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bg-level {
    height: 26px;
    width: 26px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--white-1);
  }
  .profile-photo {
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--bg-content);
    box-shadow: 0px 0px 0px 4px var(--level-color);
  }

  .name-text {
    color: #2a3959;
    font-weight: 600;
  }
  .head-info-text {
    min-width: 64px;
    color: #a5b7da;
    display: inline-block;
    font-size: 14px;
  }

  .head-info-wrapper {
    display: flex;
    column-gap: 8px;
  }

  .badge-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .photo-wrapper {
    position: relative;
  }

  .img-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lang-map-hn-wrapper {
    display: flex;
    column-gap: 6px;
    align-items: center;
  }
  .map-hn-wrapper {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--color-5-100);
    color: var(--color-5-400);
    display: grid;
    place-items: center;
    cursor: pointer;
    user-select: none;
    transition: background 0.125s;
  }

  .map-hn-wrapper:active {
    background: var(--color-5-200);
  }

  .shortname-text {
    padding: 4px 16px;
    background: #f5f8ff;
    border-radius: 4px;
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 6px;
    color: var(--gray-800);
  }

  .content-fixed {
    /* TODO: w8 for testing */
    /* margin-bottom: 16px; */
  }

  .content-scroll {
    padding: 0 16px 12px;
    overflow-y: var(--overflow);
    max-height: var(--scroll-height);
    overflow-x: hidden;
  }

  .see-more-wrapper {
    cursor: pointer;
    display: flex;
    column-gap: 6px;
    margin-right: 6px;
    color: var(--color-5-500);
    font-weight: 600;
    align-items: center;
    user-select: none;
  }

  .preferred-action-on {
    cursor: pointer;
    transition: background-color 0.125s;
  }

  .preferred-action-on:hover {
    background-color: #eef2fb;
  }

  .preferred-action-on:active {
    background-color: #eceef3;
  }

  .preferred-action-off {
    pointer-events: none;
  }

  .see-more-wrapper:active {
    color: var(--color-5-600);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #8ba3b8;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    height: 8px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #bbc5ce;
    border-radius: 10px;
  }
`;
