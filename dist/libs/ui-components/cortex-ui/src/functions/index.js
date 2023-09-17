const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const findEmptySlot = (slots) => {
  let obj = {};
  slots.forEach((slot) => {
    const slotName = slot.attributes.getNamedItem('name')?.value;
    if (slotName) {
      const sit = slot.assignedNodes();
      Object.assign(obj, { [slotName]: sit.length === 0 ? true : false });
    }
  });
  return obj;
};
const checkBrowser = () => {
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
const capitalize = (string) => string && string[0].toUpperCase() + string.slice(1);
const setBrowserTabName = (tabname) => {
  document.title = tabname ? `${capitalize(tabname.replace(/-/g, ' '))} - Cortex` : 'Cortex';
};
const customEvent = (element, event, data) => {
  element.dispatchEvent(
    new CustomEvent(event, {
      detail: {
        ...data,
      },
      bubbles: true,
    })
  );
};
const firstParam = (path) => {
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
const setTitle = (title) => {
  const layout = document.body.querySelector('c-layout');
  if (layout?.titleName) layout.titleName = title;
};
const mappedServices = {
  calendar: 'slothUrl',
  'appointment-detail': 'slothUrl',
};
const yearFormat = (language) => {
  switch (language) {
    case 'th':
      return 'BBBB';
    case 'en':
    default:
      return 'YYYY';
  }
};
function jsonClone(data) {
  return JSON.parse(JSON.stringify(data));
}
const setProperty = (variable, host) => {
  for (const [key, value] of Object.entries(variable)) {
    if (value) {
      host.style.setProperty(key, value);
    }
  }
};
const getTextWidth = (text, fontSize, fontFamily = 'Sarabun-Regular') => {
  const span = document.createElement('span');
  span.style.fontFamily = fontFamily;
  span.style.fontSize = fontSize;
  document.body.appendChild(span);
  span.innerHTML = text;
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
};
const getParamsObject = (params) => {
  const paramObj = {};
  for (const key of params.keys()) {
    paramObj[key] = params.get(key) ?? '';
  }
  return paramObj;
};
const getParamsString = (paramObj) => {
  let paramString = '';
  for (const [key, value] of Object.entries(paramObj)) {
    paramString = `${paramString}&${key}=${value}`;
  }
  return paramString;
};
const getAllQueryParams = (params) => {
  const paramObj = getParamsObject(params);
  const paramString = getParamsString(paramObj);
  return {
    paramObj,
    paramString,
  };
};
let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};
let throttlePause;
const throttle = (callback, time) => {
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
// change name 'parse' = 'value'
const value = (value) => JSON.stringify(value);
const parse = (data) => JSON.parse(JSON.stringify(data));
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const get = (eventName, callback) => {
  document.body.addEventListener(eventName, callback);
};
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getById = (componentId, eventName, callback) => {
  document.body.querySelector(`#${componentId}`)?.addEventListener(eventName, callback);
};
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const remove = (eventName, callback) => {
  document.body.removeEventListener(eventName, callback);
};
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const removeById = (componentId, eventName, callback) => {
  document.body.querySelector(`#${componentId}`)?.removeEventListener(eventName, callback);
};
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const event = (component, event, callback) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (component?.current) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component?.current?.addEventListener(event, callback);
  } else if (component?.tagName) {
    // @ts-ignore
    component?.addEventListener(event, callback);
  }
};
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const clear = (component, event, callback) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (component?.current) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component?.current?.removeEventListener(event, callback);
  } else if (component?.tagName) {
    // @ts-ignore
    component?.removeEventListener(event, callback);
  }
};
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const asyncEvent = (component, event, callback, timeout = 5000) => {
  const componentTimeout = Date.now() + timeout;
  const asyncComponent = setInterval(() => {
    //@ts-ignore
    if (component.current) {
      clearAsync(asyncComponent);
      //@ts-ignore
      component.current?.addEventListener(event, callback);
    } else if (Date.now() >= componentTimeout) {
      clearAsync(asyncComponent);
      throw new Error('Async Event: Component is not updated.');
    }
  }, 1000);
};
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const asyncClear = (component, event, callback, timeout = 5000) => {
  const componentTimeout = Date.now() + timeout;
  const asyncComponent = setInterval(() => {
    //@ts-ignore
    if (component.current) {
      clearAsync(asyncComponent);
      //@ts-ignore
      component.current?.removeEventListener(event, callback);
    } else if (Date.now() >= componentTimeout) {
      clearAsync(asyncComponent);
      throw new Error('Async Event: Component is not updated.');
    }
  }, 1000);
};
// FIXME: typing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const clearAsync = (asyncComponent) => {
  clearInterval(asyncComponent);
};
// FIXME: typing
const transition = (
  transitionId,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback,
  checkBy, // string is current path || always is allows function execution
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
const activeSidebar = (path) => {
  const cLayout = document.body.querySelector('c-layout');
  if (cLayout) {
    cLayout.setActiveSidebar(path);
  }
};
const setPageTitle = (titlePage) => {
  const cLayout = document.body.querySelector('c-layout');
  cLayout.forcedTitleName = titlePage;
  return {
    setActiveSidebar: cLayout.setActiveSidebar.bind(cLayout),
  };
};
const setPreviousPageTitle = () => {
  const cLayout = document.body.querySelector('c-layout');
  const titleName = firstParam(localStorage.getItem('c-layout-previousUrl' || '') || '').replace(
    /-/g,
    ' '
  );
  cLayout.forcedTitleName = titleName;
  return {
    setActiveSidebar: cLayout.setActiveSidebar.bind(cLayout),
  };
};
const setNextPageTitle = (titlePage) => {
  const cLayout = document.body.querySelector('c-layout');
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
const servicePath = {
  calendar: 'slothUrl',
  'appointment-detail': 'slothUrl',
  'appointment-booking': 'slothUrl',
  'encounter-timeline': 'opdUiUrl',
};
const serviceAppName = {
  slothUrl: 'Sloth',
  opdUiUrl: 'OPD',
};
const open = (environment, mainServicePath, newTabUrl) => {
  const service = servicePath[mainServicePath];
  const params = new URL(document.location.href).searchParams;
  // ถ้าหา fromService ไม่เจอ ให้ window.open() ไปยัง service ภายนอกเลย
  const fromService = params.get('fromService') ?? service;
  const url = `${environment[fromService]}/${mainServicePath}/?_blank=${environment[service]}/${newTabUrl}`;
  window.open(url, '_blank');
};
const external = (environment) => {
  const serviceName = firstParam();
  const path = `${environment[servicePath[serviceName]]}/${serviceName}`;
  const service = serviceAppName[servicePath[serviceName]];
  return {
    path,
    service,
  };
};
const noticeMenu = (menuName, isNotice = true) => {
  const layoutRef = document.querySelector('c-layout');
  layoutRef.noticeMenu(menuName, isNotice);
};
module.exports.noticeMenu = noticeMenu;
module.exports.activeSidebar = activeSidebar;
module.exports.asyncClear = asyncClear;
module.exports.asyncEvent = asyncEvent;
module.exports.clear = clear;
module.exports.event = event;
module.exports.external = external;
module.exports.get = get;
module.exports.getById = getById;
module.exports.open = open;
module.exports.parse = parse;
module.exports.remove = remove;
module.exports.removeById = removeById;
module.exports.servicePath = servicePath;
module.exports.setNextPageTitle = setNextPageTitle;
module.exports.setPageTitle = setPageTitle;
module.exports.setPreviousPageTitle = setPreviousPageTitle;
module.exports.shake = shake;
module.exports.transition = transition;
module.exports.value = value;
module.exports.timeout = timeout;
module.exports.findEmptySlot = findEmptySlot;
module.exports.checkBrowser = checkBrowser;
module.exports.capitalize = capitalize;
module.exports.customEvent = customEvent;
module.exports.firstParam = firstParam;
module.exports.setTitle = setTitle;
module.exports.mappedServices = mappedServices;
module.exports.yearFormat = yearFormat;
module.exports.jsonClone = jsonClone;
module.exports.setProperty = setProperty;
module.exports.getTextWidth = getTextWidth;
module.exports.getParamsObject = getParamsObject;
module.exports.getParamsString = getParamsString;
module.exports.getAllQueryParams = getAllQueryParams;
module.exports.debounce = debounce;
module.exports.throttle = throttle;
//# sourceMappingURL=index.js.map
