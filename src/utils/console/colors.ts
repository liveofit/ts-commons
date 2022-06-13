export const colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  Black: '\x1b[30m',
  Red: '\x1b[31m',
  Green: '\x1b[32m',
  Yellow: '\x1b[33m',
  Blue: '\x1b[34m',
  Magenta: '\x1b[35m',
  Cyan: '\x1b[36m',
  White: '\x1b[37m',

  BrightBlack: '\x1b[1;30m',
  BrightRed: '\x1b[1;31m',
  BrightGreen: '\x1b[1;32m',
  BrightYellow: '\x1b[1;33m',
  BrightBlue: '\x1b[1;34m',
  BrightMagenta: '\x1b[1;35m',
  BrightCyan: '\x1b[1;36m',
  BrightWhite: '\x1b[1;37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};
export type Color = keyof typeof colors;

export const colorizedPrint = (data: any, color?: Color) => {
  color ? console.log(colors[color], data) : console.log(data);
};
