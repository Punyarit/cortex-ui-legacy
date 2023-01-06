/* eslint-disable */
export const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
export const findEmptySlot = (slots) => {
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
export const checkBrowser = () => {
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
export const capitalize = (string) => string && string[0].toUpperCase() + string.slice(1);
export const setBrowserTabName = (tabname) => {
    document.title = tabname ? `${capitalize(tabname.replace(/-/g, ' '))} - Cortex` : 'Cortex';
};
export const customEvent = (element, event, data) => {
    element.dispatchEvent(new CustomEvent(event, {
        detail: {
            ...data,
        },
        bubbles: true,
    }));
};
export const firstParam = (path) => {
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
export const setTitle = (title) => {
    const layout = document.body.querySelector('c-layout');
    if (layout?.titleName)
        layout.titleName = title;
};
export const mappedServices = {
    calendar: 'slothUrl',
    'appointment-detail': 'slothUrl',
};
export const yearFormat = (language) => {
    switch (language) {
        case 'th':
            return 'BBBB';
        case 'en':
        default:
            return 'YYYY';
    }
};
export function jsonClone(data) {
    return JSON.parse(JSON.stringify(data));
}
export const setProperty = (variable, host) => {
    for (const [key, value] of Object.entries(variable)) {
        if (value) {
            host.style.setProperty(key, value);
        }
    }
};
export const getTextWidth = (text, fontSize, fontFamily = 'Sarabun-Regular') => {
    const span = document.createElement('span');
    span.style.fontFamily = fontFamily;
    span.style.fontSize = fontSize;
    document.body.appendChild(span);
    span.innerHTML = text;
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
};
export const getParamsObject = (params) => {
    const paramObj = {};
    for (const key of params.keys()) {
        paramObj[key] = params.get(key) ?? '';
    }
    return paramObj;
};
export const getParamsString = (paramObj) => {
    let paramString = '';
    for (const [key, value] of Object.entries(paramObj)) {
        paramString = `${paramString}&${key}=${value}`;
    }
    return paramString;
};
export const getAllQueryParams = (params) => {
    const paramObj = getParamsObject(params);
    const paramString = getParamsString(paramObj);
    return {
        paramObj,
        paramString,
    };
};
let debounceTimer;
export const debounce = (callback, time) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
};
let throttlePause;
export const throttle = (callback, time) => {
    //don't run the function if throttlePause is true
    if (throttlePause)
        return;
    //set throttlePause to true after the if condition. This allows the function to be run once
    throttlePause = true;
    //setTimeout runs the callback within the specified time
    setTimeout(() => {
        callback();
        //throttlePause is set to false once the function has been called, allowing the throttle function to loop
        throttlePause = false;
    }, time);
};
//# sourceMappingURL=helper.js.map