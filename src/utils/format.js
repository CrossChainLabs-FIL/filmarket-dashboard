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