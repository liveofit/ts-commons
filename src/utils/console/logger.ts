import chalk, { ChalkInstance } from 'chalk';
export * as chalk from 'chalk'

/**
 * @interface ILogger
 * @description Describe attributes to configure the Logger class.
 */
export interface ILogger {
  /**
   * @default undefined If not present all levels are going to be logged
   */
  logLevels?: ('debug' | 'log' | 'info' | 'warn' | 'error' | 'success')[];
  /**
   * @default undefined Only defined callbacks will be called when its respective function is called
   */
  cbs?: {
    debug?: (data: any) => any;
    log?: (data: any) => any;
    info?: (data: any, processName?: string) => any;
    warn?: (data: any, processName?: string) => any;
    error?: (data: any, processName?: string) => any;
    success?: (data: any, processName?: string) => any;
  };
  /**
   * @default chalk.hex('ffa500')
   */
  debugColor?: ChalkInstance;
  /**
   * @default chalk.white
   */
  infoColor?: ChalkInstance;
  /**
   * @default chalk.blueBright
   */
   titleColor?: ChalkInstance;
  /**
   * @default chalk.yellowBright
   */
  warnColor?: ChalkInstance;
  /**
   * @default chalk.redBright
   */
  errorColor?: ChalkInstance;
  /**
   * @default chalk.greenBright
   */
  successColor?: ChalkInstance;
}

/**
 * @class Logger
 * @description Allows you to use a centralized logger and control where and when the logs will be applied
 */
export class Logger {
  private readonly config: ILogger;
  constructor(config: ILogger) {
    this.config = config;
    config.debugColor && (this.config.debugColor = chalk.hex('ffa500'));
    config.titleColor && (this.config.titleColor = chalk.blueBright);
    config.infoColor && (this.config.infoColor = chalk.white);
    config.warnColor && (this.config.warnColor = chalk.yellowBright);
    config.errorColor && (this.config.errorColor = chalk.redBright);
    config.successColor && (this.config.successColor = chalk.greenBright);
  }

  public debug(data: any) {
    if (!this.config.logLevels || this.config.logLevels.includes('debug')) {
      typeof data === 'object'
        ? console.debug(this.config.debugColor!(`🐛 [Debug]: ${JSON.stringify(data, null, 2)}`))
        : console.debug((`🐛 [Debug]: ${data?.toString()}`));
      this.config.cbs?.debug && this.config.cbs.debug(data);
    }
  }
  public log(data: any) {
    if (!this.config.logLevels || this.config.logLevels.includes('log')) {
      console.log(data);
      this.config.cbs?.log && this.config.cbs.log(data);
    }
  }
  public info(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('info')) {
      typeof data === 'object'
        ? console.log(
            this.config.debugColor!(`ℹ️ [${processName || 'INFO'}]: ${JSON.stringify(data, null, 2)}`),
          )
        : console.log(this.config.debugColor!(`ℹ️  [${processName || 'INFO'}]: ${data?.toString()}`));
    }
    this.config.cbs?.info && this.config.cbs.info(data, processName);
  }
  public title(title: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('log')) {
      console.log(chalk.blueBright(`👉 ${title}`));
      this.config.cbs?.log && this.config.cbs.log(title);
    }
  }
  public success(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('success')) {
      typeof data === 'object'
        ? console.info(
            chalk.greenBright(`✅ [${processName || 'SUCCESS'}]: ${JSON.stringify(data, null, 2)}`),
          )
        : console.info(chalk.greenBright(`✅ [${processName || 'SUCCESS'}]: ${data?.toString()}`));
      this.config.cbs?.success && this.config.cbs.success(data, processName);
    }
  }
  public warn(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('warn')) {
      typeof data === 'object'
        ? console.warn(
            chalk.yellowBright(
              `⚠️ [${processName || 'WARNING'}]: ${JSON.stringify(data, null, 2)}`,
            ),
          )
        : console.warn(chalk.yellowBright(`⚠️ [${processName}]: ${data?.toString()}`));
    }
    this.config.cbs?.warn && this.config.cbs.warn(data, processName);
  }
  public error(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('error')) {
      if (data.stack)
        console.error(chalk.redBright(`❌ [${processName || 'ERROR'}]: ${data.stack?.toString()}`));
      if (typeof data === 'object') console.error(chalk.redBright(JSON.stringify(data, null, 2)));
      else console.error(chalk.redBright(data?.toString()));
    }
    this.config.cbs?.error && this.config.cbs.error(data, processName);
  }
}
