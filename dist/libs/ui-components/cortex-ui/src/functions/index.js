import { firstParam, timeout } from '../helper/helper';
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
    }
    else if (component?.tagName) {
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
    }
    else if (component?.tagName) {
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
        }
        else if (Date.now() >= componentTimeout) {
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
        }
        else if (Date.now() >= componentTimeout) {
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
const transition = (transitionId, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
callback, checkBy, // string is current path || always is allows function execution
animationIn = 'fade-in', animationOut = 'fade-out') => {
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
    const titleName = firstParam(localStorage.getItem('c-layout-previousUrl' || '') || '').replace(/-/g, ' ');
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
//# sourceMappingURL=index.js.map