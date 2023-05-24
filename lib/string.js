export const zeroFill = (number, width) => {
    return new Array(+width + 1 - (number + '').length).join('0') + number
};

export const camelToKebabCase = (string = '') => {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const camelToSnakeCase = (string = '') => {
    return string
        .replace(/(.)([A-Z][a-z]+)/g, '$1_$2')
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .toLowerCase();
};
