import numeral from 'numeral';

export function currency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function percentFormat(number) {
  return numeral(number / 100).format('0.0%');
}

export function number(number) {
  return numeral(number).format();
}