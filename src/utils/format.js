import numeral from 'numeral';
var BigNumber = require('bignumber.js');

export function currency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function percentFormat(number) {
  return numeral(number / 100).format('0.0%');
}

export function number(number) {
  return numeral(number).format();
}

export function toUSD(fil, filPriceUSD) {
  let f = new BigNumber(fil);
  let p = new BigNumber(filPriceUSD);

  if (f.isNaN() || p.isNaN()) {
      return 'N/A';
  }

  if (f.isZero() || p.isZero()) {
      return '0';
  }

  return `${f.multipliedBy(p).decimalPlaces(18).toFixed()}`;
}

export function formatDigits(value) {
  const digits = Math.trunc(value).toString().length;
  let precision = digits;
  if (digits > 1) {
    precision += 2;
  } else {
    precision += 4;
  }

  return parseFloat(value).toPrecision(precision);
}

export function formatSizeFromGiB(size, decimals = 2) {
  if (0 === size) return "0 size";
  const c = 0 > decimals ? 0 : decimals;
  const d = Math.floor(Math.log(size) / Math.log(1024));
  return parseFloat((size / Math.pow(1024, d)).toFixed(c)) + " " + ["GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d];
}

export function formatSizeFromTiB(size, decimals = 2) {
  if (0 === size) return "0 size";
  const c = 0 > decimals ? 0 : decimals;
  const d = Math.floor(Math.log(size) / Math.log(1024));
  return parseFloat((size / Math.pow(1024, d)).toFixed(c)) + " " + ["TiB", "PiB", "EiB", "ZiB", "YiB"][d];
}