export {
  getAPI,
  formatNumber,
  formatNumberWithSeparators,
  DefaultDateTimeFormat,
  DefaultDateFormat,
  formatDate,
  formatUTCDate,
  limitDecimals,
  limitInputNumber,
  isInvalidInput,
  isValidNumber,
  toWeiInv,
  numberToBytes32,
  getParamsFromUrl,
  uniqWith,
  getWeekDays,
  compareDate,
  formatPercentNumber,
  downloadJsonFile,
  SITE_ENV,
} from './helper';

export { parseContractError } from './error';

export { PageBlock } from './pageBlock';

export {
  isTransactionConfirmed,
  registerSendTxEvents,
  approveERC20Max,
  getERC20Allowance,
  getERC20Amount,
} from './common';

export {
  ApprovalStatus,
  IERC20ApprovalEventOptions,
  IERC20ApprovalOptions,
  IERC20ApprovalAction,
  ERC20ApprovalModel,
  getERC20ApprovalModelAction
} from './approvalModel';
