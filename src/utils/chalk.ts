// 根据日志级别，用不同颜色区分
let Chalk = require('chalk');
export const log = {
  green(e) {
    return console.log('🚀', typeof e === 'object' ? e : Chalk.green(e));
  },
  blue(e) {
    return console.log('🚀', typeof e === 'object' ? e : Chalk.blue(e));
  },
  cyan(e) {
    return console.log('🚀', typeof e === 'object' ? e : Chalk.cyan(e));
  },
  yellow(e) {
    return console.log('🚀', typeof e === 'object' ? e : Chalk.yellow(e));

  },
  red(e) {
    return console.log('🚀', typeof e === 'object' ? e : Chalk.red(e));
  },
  grey(e) {
    return console.log('🚀', typeof e === 'object' ? e : Chalk.grey(e));
  },
  hex(e) {
    return console.log('🚀', typeof e === 'object' ? e : Chalk.hex(e));
  },
};
