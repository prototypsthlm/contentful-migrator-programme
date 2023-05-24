import chalk from 'chalk';

const c = chalk;

export const info = (...message) => console.log(c.blue(...message));
export const success = (...message) => console.log(c.green(...message));
export const error = (...message) => console.log(c.red(...message));
export const warn = (...message) => console.log(c.yellow(...message));