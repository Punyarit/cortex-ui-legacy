import { css } from 'lit';

export const mediacationListSTyle = css`
  td {
    box-sizing: border-box;
  }

  .med-content > div:nth-child(2) {
    color: #247cff;
    border-radius: 4px;
    padding: 4px 8px;
  }

  .detail-content > div:first-child {
    color: #2a3959;
    font-weight: 600;
    margin-top: 3px;
  }
  .detail-content > div:nth-child(2) {
    color: #7386af;
  }

  .action-btn {
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.125s;
    user-select: none;
  }

  .continue {
  }
  .forward {
    border: 1px solid #c2f0eb;
    margin-right: 8px;
  }

  .stop {
    border: 1px solid #dfe6f7;
  }

  .error {
    position: absolute;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 6px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .error > .action-btn-wrapper {
    padding-bottom: 0;
  }

  .error-text {
    font-size: 12px;
    display: flex;
    column-gap: 4px;
    color: red;
    width: 100%;
    padding-left: 8px;
    text-align: left;
    box-sizing: border-box;
  }

  .qty-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* table */
  .table-list {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    position: relative;
    table-layout: fixed;
  }

  .table-list tr > td {
    border-left: 1px solid #e7eeff;
    border-bottom: 1px solid #e7eeff;
    border-right: 1px solid #e7eeff;
  }

  .table-list tr > td:nth-child(1),
  .table-list tr > td:nth-child(3) {
    min-width: 438px;
  }

  .table-list tr > td:nth-child(2) {
    width: 128px;
  }

  .table-list tr > td:nth-child(4) {
    width: 80px;
  }

  table > thead tr td {
    border-top: 1px solid #e7eeff;
  }

  .table-list.body-table {
    td {
      min-height: 100px;
    }
  }

  .head-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 24px;
  }

  .med-content {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding: 13px 24px 16px 24px;
  }

  .head-title > div:nth-child(1) {
    font-size: 20px;
    font-weight: 500;
    color: #3f527a;
  }
  .head-title > div:nth-child(2) {
    font-size: 16px;
    font-weight: 500;
    color: #7386af;
  }

  .action-btn-wrapper {
    display: flex;
    width: 128px;
    justify-content: center;
    padding: 14px 12px;
    box-sizing: border-box;
    align-items: center;
  }

  .qty-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    color: #3f527a;
  }

  .no-medication-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .no-medication-list > div:nth-child(2) {
    font-weight: 600;
    font-size: 28px;
    color: #2a3959;
  }
  .no-medication-list > div:nth-child(3) {
    font-weight: 500;
    font-size: 18px;
    color: #7386af;
    margin-top: 12px;
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

  .content-wrapper {
  }

  .forward-DISABLED,
  .stop-DISABLED {
    pointer-events: none;
    border: 1px solid #e7eeff !important;
  }

  .forward-CONTINUE {
    background: #33cabb;
  }

  .stop-DISCONTINUE {
    background: #7386af;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  .edit-wrapper {
    display: flex;
    justify-content: flex-end;
    column-gap: 12px;
    margin-top: 12px;
  }

  .edit-wrapper > c-icon {
    cursor: pointer;
  }

  .type-wrapper {
    display: flex;
    flex-direction: column;
  }

  .type-display {
    background: #f5f8ff;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    border-radius: 4px;
    padding: 0 8px;
    text-transform: capitalize;
  }
`;
