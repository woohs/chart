const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {type: 'console'},
    cheese: {
      type: 'file',
      filename: 'logs/logger.log' ,
      maxLogSize: 1024*1024*100, //最大100m
      backups: 3, //备份三份文件
    }
  },
  categories: {
    default: { appenders: ['console','cheese'], level: 'trace' }
  }
  
});

const logger = log4js.getLogger('cheese');

logger.trace('log4js module is Run.');

module.exports = logger; //输出模块

/**
例子：
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
**/