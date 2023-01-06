/* eslint-disable */

import { LitElement } from 'lit';
import { CLayout } from '../../src/interfaces/components.interface';

export const timeout = (ms: number): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const findEmptySlot = (slots: NodeListOf<HTMLSlotElement>): Record<string, boolean> => {
  let obj = {};

  slots.forEach(slot => {
    const slotName = slot.attributes.getNamedItem('name')?.value;
    if (slotName) {
      const sit = slot.assignedNodes();
      Object.assign(obj, { [slotName]: sit.length === 0 ? true : false });
    }
  });

  return obj;
};

export const checkBrowser = (): string | void => {
  switch (true) {
    case (navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) != -1:
      return 'Opera';

    case navigator.userAgent.indexOf('Chrome') != -1:
      return 'Chrome';

    case navigator.userAgent.indexOf('Safari') != -1:
      return 'Safari';

    case navigator.userAgent.indexOf('Firefox') != -1:
      return 'Firefox';

    default:
      break;
  }
};

export const capitalize = (string: string) => string && string[0].toUpperCase() + string.slice(1);

export const setBrowserTabName = (tabname: string) => {
  document.title = tabname ? `${capitalize(tabname.replace(/-/g, ' '))} - Cortex` : 'Cortex';
};

export const customEvent = <T>(element: LitElement, event: string, data: Record<string, T>) => {
  element.dispatchEvent(
    new CustomEvent(event, {
      detail: {
        ...data,
      },
      bubbles: true,
    })
  );
};

export const firstParam = (path?: string): string => {
  const [, firstPath, secondPath] = (path || location.pathname).split('/');
  // find by first pathname
  switch (firstPath) {
    case '/':
    case '':
      return '';
    // on dev such as *dev.cortexcloud.co/opd/home
    case 'opd':
    case 'sloth':
    case 'er':
    case 'venti':
    case 'staff-scheduling':
    case 'cortex-admin':
      return secondPath;
    // on local such as *localhost:4200/home
    default:
      return firstPath;
  }
};

export const setTitle = (title: string) => {
  const layout = document.body.querySelector('c-layout') as CLayout;
  if (layout?.titleName) layout.titleName = title;
};

export const mappedServices = {
  calendar: 'slothUrl',
  'appointment-detail': 'slothUrl',
};

export const yearFormat = (language: string): string => {
  switch (language) {
    case 'th':
      return 'BBBB';

    case 'en':
    default:
      return 'YYYY';
  }
};

export function jsonClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

export const setProperty = (variable: Record<string, string>, host: HTMLElement) => {
  for (const [key, value] of Object.entries(variable)) {
    if (value) {
      host.style.setProperty(key, value);
    }
  }
};

export const getTextWidth = (text: string, fontSize: string, fontFamily = 'Sarabun-Regular') => {
  const span = document.createElement('span');
  span.style.fontFamily = fontFamily;
  span.style.fontSize = fontSize;
  document.body.appendChild(span);
  span.innerHTML = text;
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
};

export const getParamsObject = (params: URLSearchParams): { [key: string]: string } => {
  const paramObj: { [key: string]: string } = {};
  for (const key of params.keys()) {
    paramObj[key] = params.get(key) ?? '';
  }
  return paramObj;
};

export const getParamsString = (paramObj: Record<string, string>): string => {
  let paramString = '';

  for (const [key, value] of Object.entries(paramObj)) {
    paramString = `${paramString}&${key}=${value}`;
  }

  return paramString;
};

export const getAllQueryParams = (
  params: URLSearchParams
): {
  paramObj: {
    [key: string]: string;
  };
  paramString: string;
} => {
  const paramObj = getParamsObject(params);
  const paramString = getParamsString(paramObj);
  return {
    paramObj,
    paramString,
  };
};

let debounceTimer: number;

export const debounce = (callback: () => void, time: number) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

let throttlePause: boolean;

export const throttle = (callback: () => void, time: number) => {
  //don't run the function if throttlePause is true
  if (throttlePause) return;

  //set throttlePause to true after the if condition. This allows the function to be run once
  throttlePause = true;

  //setTimeout runs the callback within the specified time
  setTimeout(() => {
    callback();

    //throttlePause is set to false once the function has been called, allowing the throttle function to loop
    throttlePause = false;
  }, time);
};
