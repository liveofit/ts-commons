import { colorizedPrint, Color } from './colors';
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
  debugColor?: Color;
  /**
   * @default colors.white
   */
  infoColor?: Color;
  /**
   * @default colors.blue
   */
  titleColor?: Color;
  /**
   * @default colors.yellow
   */
  warnColor?: Color;
  /**
   * @default colors.red
   */
  errorColor?: Color;
  /**
   * @default colors.green
   */
  successColor?: Color;
}

/**
 * @class Logger
 * @description Allows you to use a centralized logger and control where and when the logs will be applied
 */
export class Logger {
  private readonly config: ILogger;
  constructor(config: ILogger) {
    this.config = config;
    !config.debugColor && (this.config.debugColor = 'BrightMagenta');
    !config.titleColor && (this.config.titleColor = 'BrightBlue');
    !config.infoColor && (this.config.infoColor = 'White');
    !config.warnColor && (this.config.warnColor = 'BrightYellow');
    !config.errorColor && (this.config.errorColor = 'BrightRed');
    !config.successColor && (this.config.successColor = 'BrightGreen');
  }

  public debug(data: any) {
    if (!this.config.logLevels || this.config.logLevels?.includes('debug')) {
      typeof data === 'object'
        ? colorizedPrint(`🐛 [Debug]: ${JSON.stringify(data, null, 2)}`, this.config.debugColor)
        : colorizedPrint(`🐛 [Debug]: ${data?.toString()}`, this.config.debugColor);
      this.config.cbs?.debug && this.config.cbs.debug(data);
    }
  }
  public log(data: any) {
    if (!this.config.logLevels || this.config.logLevels?.includes('log')) {
      colorizedPrint(data);
      this.config.cbs?.log && this.config.cbs.log(data);
    }
  }
  public info(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels?.includes('info')) {
      typeof data === 'object'
        ? colorizedPrint(
            `ℹ️ [${processName || 'INFO'}]: ${JSON.stringify(data, null, 2)}`,
            this.config.infoColor,
          )
        : colorizedPrint(
            `ℹ️  [${processName || 'INFO'}]: ${data?.toString()}`,
            this.config.infoColor,
          );
    }
    this.config.cbs?.info && this.config.cbs.info(data, processName);
  }
  public title(title: string) {
    if (!this.config.logLevels || this.config.logLevels?.includes('log')) {
      colorizedPrint(`👉 ${title}`, this.config.titleColor);
      this.config.cbs?.log && this.config.cbs.log(title);
    }
  }
  public success(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels?.includes('success')) {
      typeof data === 'object'
        ? colorizedPrint(
            `✅ [${processName || 'SUCCESS'}]: ${JSON.stringify(data, null, 2)}`,
            this.config.successColor,
          )
        : colorizedPrint(
            `✅ [${processName || 'SUCCESS'}]: ${data?.toString()}`,
            this.config.successColor,
          );
      this.config.cbs?.success && this.config.cbs.success(data, processName);
    }
  }
  public warn(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels?.includes('warn')) {
      typeof data === 'object'
        ? colorizedPrint(
            `⚠️ [${processName || 'WARNING'}]: ${JSON.stringify(data, null, 2)}`,
            this.config.warnColor,
          )
        : colorizedPrint(`⚠️ [${processName}]: ${data?.toString()}`, this.config.warnColor);
    }
    this.config.cbs?.warn && this.config.cbs.warn(data, processName);
  }
  public error(data: any, processName?: string) {
    if (!this.config.logLevels || this.config.logLevels?.includes('error')) {
      if (data.stack)
        colorizedPrint(
          `❌ [${processName || 'ERROR'}]: ${data.stack?.toString()}`,
          this.config.errorColor,
        );
      if (typeof data === 'object')
        colorizedPrint(JSON.stringify(data, null, 2), this.config.errorColor);
      else colorizedPrint(data?.toString(), this.config.errorColor);
    }
    this.config.cbs?.error && this.config.cbs.error(data, processName);
  }
}
