import { firstParam, timeout } from '../helper/helper';
import { CLayout } from '../interfaces/components.interface';

// change name 'parse' = 'value'
const value = (value: unknown) => JSON.stringify(value);

const parse = (data: unknown) => JSON.parse(JSON.stringify(data));

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const get = (eventName: string, callback) => {
  document.body.addEventListener(eventName, callback);
};

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getById = (componentId: string, eventName: string, callback) => {
  document.body.querySelector(`#${componentId}`)?.addEventListener(eventName, callback);
};

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const remove = (eventName: string, callback) => {
  document.body.removeEventListener(eventName, callback);
};

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const removeById = (componentId: string, eventName: string, callback) => {
  document.body.querySelector(`#${componentId}`)?.removeEventListener(eventName, callback);
};

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const event = (component: unknown | null, event: string, callback: (e: CustomEvent) => void) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (component?.current) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component?.current?.addEventListener(event, callback);
  } else if ((component as Element)?.tagName) {
    // @ts-ignore
    (component as Element)?.addEventListener(event, callback);
  }
};

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const clear = (component: unknown | null, event: string, callback: (e: CustomEvent) => void) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (component?.current) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (component?.current as Element)?.removeEventListener(event, callback);
  } else if ((component as Element)?.tagName) {
    // @ts-ignore
    (component as Element)?.removeEventListener(event, callback);
  }
};

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const asyncEvent = (component: unknown | null, event: string, callback: (e: CustomEvent) => void, timeout? = 5000) => {
  const componentTimeout = Date.now() + timeout;
  const asyncComponent = setInterval(() => {
    //@ts-ignore
    if (component.current) {
      clearAsync(asyncComponent);
      //@ts-ignore
      (component.current as Element)?.addEventListener(event, callback);
    } else if (Date.now() >= componentTimeout) {
      clearAsync(asyncComponent);
      throw new Error('Async Event: Component is not updated.');
    }
  }, 1000);
};

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const asyncClear = (component: unknown | null, event: string, callback: (e: CustomEvent) => void, timeout? = 5000) => {
  const componentTimeout = Date.now() + timeout;
  const asyncComponent = setInterval(() => {
    //@ts-ignore
    if (component.current) {
      clearAsync(asyncComponent);
      //@ts-ignore
      (component.current as Element)?.removeEventListener(event, callback);
    } else if (Date.now() >= componentTimeout) {
      clearAsync(asyncComponent);
      throw new Error('Async Event: Component is not updated.');
    }
  }, 1000);
};

// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const clearAsync = (asyncComponent: ReturnType<typeof setInterval>): void => {
  clearInterval(asyncComponent);
};

// FIXME: typing
const transition = (
  transitionId: string,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback,
  checkBy: 'always' | string, // string is current path || always is allows function execution
  animationIn = 'fade-in',
  animationOut = 'fade-out'
) => {
  if (checkBy === 'always' || location.pathname !== checkBy) {
    const transitionElement = document.body.querySelector(`#${transitionId}`);

    const transitionRoot = transitionElement?.shadowRoot?.querySelector('.transition-wrapper');

    transitionRoot?.classList.add('fill-mode');
    transitionRoot?.classList.remove(animationIn);
    transitionRoot?.classList.add(animationOut);

    timeout(200)
      .then(() => {
        callback();
      })
      .then(() => {
        transitionRoot?.classList.remove(animationOut);
        transitionRoot?.classList.add(animationIn);
      })
      .then(() => {
        transitionRoot?.classList.remove('fill-mode');
      });
  }
};

const activeSidebar = (path: string): void => {
  const cLayout = document.body.querySelector('c-layout') as CLayout;
  if (cLayout) {
    cLayout.setActiveSidebar(path);
  }
};

const setPageTitle = (
  titlePage: string
): {
  setActiveSidebar: (path: string) => void;
} => {
  const cLayout = document.body.querySelector('c-layout') as CLayout;
  cLayout.forcedTitleName = titlePage;
  return {
    setActiveSidebar: cLayout.setActiveSidebar.bind(cLayout),
  };
};

const setPreviousPageTitle = () => {
  const cLayout = document.body.querySelector('c-layout') as CLayout;
  const titleName = firstParam(localStorage.getItem('c-layout-previousUrl' || '') || '').replace(/-/g, ' ');

  cLayout.forcedTitleName = titleName;
  return {
    setActiveSidebar: cLayout.setActiveSidebar.bind(cLayout),
  };
};

const setNextPageTitle = (titlePage: string) => {
  const cLayout = document.body.querySelector('c-layout') as CLayout;
  localStorage.setItem('nextPageTitle', titlePage);
  return {
    setActiveSidebar: cLayout.setActiveSidebar.bind(cLayout),
  };
};

const shake = () => {
  const body = document.body;
  body?.classList?.add('ui-shake');

  timeout(600).then(() => {
    body?.classList?.remove('ui-shake');
  });
};

// --> function for external page component
const servicePath: Record<string, string> = {
  calendar: 'slothUrl',
  'appointment-detail': 'slothUrl',
};

const serviceAppName: Record<string, string> = {
  slothUrl: 'Sloth',
  opdUiUrl: 'OPD',
};

const open = (environment: Record<string, string>, mainServicePath: string, newTabUrl: string) => {
  const service = servicePath[mainServicePath];
  const params = new URL(document.location.href).searchParams;
  // ถ้าหา fromService ไม่เจอ ให้ window.open() ไปยัง service ภายนอกเลย
  const fromService = params.get('fromService') ?? service;
  const url = `${environment[fromService]}/${mainServicePath}/?_blank=${environment[service]}/${newTabUrl}`;
  window.open(url, '_blank');
};

const external = (environment: Record<string, string>) => {
  const serviceName = firstParam();
  const path = `${environment[servicePath[serviceName]]}/${serviceName}`;
  const service = serviceAppName[servicePath[serviceName]];
  return {
    path,
    service,
  };
};

export default {
  value,
  get,
  remove,
  getById,
  removeById,
  transition,
  open,
  external,
  parse,
  shake,
  event,
  clear,
  asyncEvent,
  asyncClear,
  activeSidebar,
  setPageTitle,
  setNextPageTitle,
  setPreviousPageTitle,
};
