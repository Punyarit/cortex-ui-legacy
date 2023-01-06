import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../ingredient/skeleton';

@customElement('c-patient-list-skeleton')
export class PatientListSkeleton extends LitElement {
  static styles = css``;

  render() {
    return html` <div></div> `;
  }
}
