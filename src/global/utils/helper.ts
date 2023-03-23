import { BigNumber } from "@ijstech/eth-wallet";
import { moment } from '@ijstech/components';

export enum SITE_ENV {
  DEV = 'dev',
  TESTNET = 'testnet',
  MAINNET = 'mainnet',
}

export const DefaultDateTimeFormat = 'DD/MM/YYYY HH:mm:ss';
export const DefaultDateFormat = 'DD/MM/YYYY';

export const formatDate = (date: any, customType?: string, showTimezone?: boolean) => {
  const formatType = customType || DefaultDateFormat;
  const formatted = moment(date).format(formatType);
  if (showTimezone) {
    return `${formatted} (UTC+${moment().utcOffset() / 60})`;
  }
  return formatted;
}

export const formatUTCDate = (date: any, customType?: string, showTimezone?: boolean) => {
  const formatType = customType || DefaultDateFormat;
  const formatted = moment(date).utc().format(formatType);
  return showTimezone?  `${formatted} (UTC)` : formatted;
}

export const compareDate = (fromDate: any, toDate?: any) => {
  if (!toDate) {
    toDate = moment();
  }
  return moment(fromDate).isSameOrBefore(toDate);
}

export const formatNumber = (value: any, decimals?: number) => {
  let val = value;
  const minValue = '0.0000001';
  if (typeof value === 'string') {
    val = new BigNumber(value).toNumber();
  } else if (typeof value === 'object') {
    val = value.toNumber();
  }
  if (val != 0 && new BigNumber(val).lt(minValue)) {
    return `<${minValue}`;
  }
  return formatNumberWithSeparators(val, decimals || 4);
};

export const formatPercentNumber = (value: any, decimals?: number) => {
  let val = value;
  if (typeof value === 'string') {
    val = new BigNumber(value).toNumber();
  } else if (typeof value === 'object') {
    val = value.toNumber();
  }
  return formatNumberWithSeparators(val, decimals || 2);
};

export const formatNumberWithSeparators = (value: number, precision?: number) => {
  if (!value) value = 0;
  if (precision) {
    let outputStr = '';
    if (value >= 1) {
      outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
    }
    else {
      outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
    }

    if (outputStr.length > 18) {
      outputStr = outputStr.substr(0, 18) + '...'
    }
    return outputStr;
  }
  else {
    return value.toLocaleString('en-US');
  }
}

export const isValidNumber = (value: string | number) => {
  const val = new BigNumber(value);
  return val.gte(0);
}

export const isInvalidInput = (val: any) => {
  const value = new BigNumber(val);
  if (value.lt(0)) return true;
  return (val || '').toString().substring(0, 2) === '00' || val === '-';
};

export const limitInputNumber = (input: any, decimals?: number) => {
  const amount = input.value;
  if (isInvalidInput(amount)) {
    input.value = '0';
    return;
  }
  if (!new BigNumber(amount).isNaN()) {
    input.value = limitDecimals(amount, decimals || 18);
  }
}

export const limitDecimals = (value: any, decimals: number) => {
  let val = value;
  if (typeof value !== 'string') {
    val = val.toString();
  }
  let chart;
  if (val.includes('.')) {
    chart = '.';
  } else if (val.includes(',')) {
    chart = ',';
  } else {
    return value;
  }
  const parts = val.split(chart);
  let decimalsPart = parts[1];
  if (decimalsPart && decimalsPart.length > decimals) {
    parts[1] = decimalsPart.substr(0, decimals);
    let _part = parts[1].split('');
    let _index = -1;
    for (let i = _part.length; i--; i >= 0) {
      if (Number(_part[i]) > 0) {
        break;
      }
      _index = i;
    }
    if (_index === 0) {
      return parts[0];
    }
    if (_index > 0) {
      parts[1] = parts[1].substr(0, _index);
    }
  }
  return parts.join(chart);
}

export async function getAPI(url:string, paramsObj?: any): Promise<any> {
  let queries = '';
  if (paramsObj) {
      try {
          queries = new URLSearchParams(paramsObj).toString();
      } catch(err) {
          console.log('err', err)
      }
  }
  let fullURL = url + (queries ? `?${queries}` : '');
  const response = await fetch(fullURL, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
  });
  return response.json();
}

export const toWeiInv = (n: string, unit?: number) => {
  if (new BigNumber(n).eq(0)) return new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'); 
  return new BigNumber('1').shiftedBy((unit || 18)*2).idiv(new BigNumber(n).shiftedBy(unit || 18));
}

export const padLeft = function(string: string, chars: number, sign?: string){
  return new Array(chars - string.length + 1).join(sign ? sign : "0") + string;
}

export const numberToBytes32 = (value: any, prefix?: string) => {
  if (!value) return;
  let v = value;
  if (typeof value == "number") {
    // covert to a hex string
    v = value.toString(16);
  } else if (/^[0-9]*$/.test(value)) {
    // assuming value to be a decimal number, value could be a hex
    v = new BigNumber(value).toString(16);
  } else if (/^(0x)?[0-9A-Fa-f]*$/.test(value)) {
    // value already a hex
    v = value;
  } else if (BigNumber.isBigNumber(value)) {
    v = value.toString(16);
  }
  v = v.replace("0x", "");
  v = padLeft(v, 64);
  if (prefix)
    v = '0x' + v
  return v;
}

const replacer = (key: string, value: any) => {
  if (['offerIndex','share'].includes(key)) {
    const val = Number(value);
    return isNaN(val) ? value : val;
  }
  return value;
}

export const downloadJsonFile = (name: string, obj: any) => {
  const link = document.createElement("a");
  const text = JSON.stringify(obj, replacer, 2);
  link.download = name;
  const jsonContent = `data:application/json;charset=utf-8,${encodeURIComponent(text)}`;
  link.href = jsonContent;
  link.click();
}

export const truncateAddress = (address: string) => {
  let addr: any = address;
  if (addr === undefined || addr === null) return '';
  return addr.substr(0, 6) + '...' + addr.substr(-4);
}
