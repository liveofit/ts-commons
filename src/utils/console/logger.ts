import colors from 'colors';
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
   * @default colors.magenta
   */
  debugColor?: colors.Color;
  /**
   * @default colors.white
   */
  infoColor?: colors.Color;
  /**
   * @default colors.blue
   */
  titleColor?: colors.Color;
  /**
   * @default colors.yellow
   */
  warnColor?: colors.Color;
  /**
   * @default colors.red
   */
  errorColor?: colors.Color;
  /**
   * @default colors.green
   */
  successColor?: colors.Color;
}

/**
 * @class Logger
 * @description Allows you to use a centralized logger and control where and when the logs will be applied
 */
export class Logger {
  private readonly config: ILogger;
  constructor(config: ILogger) {
    this.config = config;
    !config.debugColor && (this.config.debugColor = colors.magenta);
    !config.titleColor && (this.config.titleColor = colors.blue);
    !config.infoColor && (this.config.infoColor = colors.white);
    !config.warnColor && (this.config.warnColor = colors.yellow);
    !config.errorColor && (this.config.errorColor = colors.red);
    !config.successColor && (this.config.successColor = colors.green);
  }

  public debug(data: any) {
    if (!this.config.logLevels || this.config.logLevels.includes('debug')) {
      typeof data === 'object'
        ? console.debug(this.config.debugColor!(`🐛 [Debug]: ${JSON.stringify(data, null, 2)}`))
        : console.debug(`🐛 [Debug]: ${data?.toString()}`);
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
            this.config.debugColor!(
              `ℹ️ [${processName || 'INFO'}]: ${JSON.stringify(data, null, 2)}`,
            ),
          )
        : console.log(
            this.config.debugColor!(`ℹ️  [${processName || 'INFO'}]: ${data?.toString()}`),
          );
    }
    this.config.cbs?.info && this.config.cbs.info(data, processName);
  }
  public title(title: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('log')) {
      console.log(this.config.titleColor!(`👉 ${title}`));
      this.config.cbs?.log && this.config.cbs.log(title);
    }
  }
  public success(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('success')) {
      typeof data === 'object'
        ? console.info(
            this.config.infoColor!(
              `✅ [${processName || 'SUCCESS'}]: ${JSON.stringify(data, null, 2)}`,
            ),
          )
        : console.info(
            this.config.successColor!(`✅ [${processName || 'SUCCESS'}]: ${data?.toString()}`),
          );
      this.config.cbs?.success && this.config.cbs.success(data, processName);
    }
  }
  public warn(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('warn')) {
      typeof data === 'object'
        ? console.warn(
            this.config.warnColor!(
              `⚠️ [${processName || 'WARNING'}]: ${JSON.stringify(data, null, 2)}`,
            ),
          )
        : console.warn(this.config.warnColor!(`⚠️ [${processName}]: ${data?.toString()}`));
    }
    this.config.cbs?.warn && this.config.cbs.warn(data, processName);
  }
  public error(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels.includes('error')) {
      if (data.stack)
        console.error(
          this.config.errorColor!(`❌ [${processName || 'ERROR'}]: ${data.stack?.toString()}`),
        );
      if (typeof data === 'object')
        console.error(this.config.errorColor!(JSON.stringify(data, null, 2)));
      else console.error(this.config.errorColor!(data?.toString()));
    }
    this.config.cbs?.error && this.config.cbs.error(data, processName);
  }
}
