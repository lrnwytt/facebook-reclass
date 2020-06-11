import moment from 'moment';
import {
    FB_DONATION_SOURCE_MAP,
    FB_DONATION_TRANSFORM_MAP
} from './constants';
import { titleCase, referenceNumberOrNone } from './helpers';

const {
    SALES_RECEIPT_NUMBER,
    CUSTOMER,
    SALES_RECEIPT_DATE,
    DEPOSIT_TO,
    PAYMENT_METHOD,
    REFERENCE_NUMBER,
    MEMO,
    RECEIPT_MESSAGE,
    EMAIL,
    PRODUCT,
    DESCRIPTION,
    QUALTITY,
    AMOUNT
} = FB_DONATION_TRANSFORM_MAP;

export const transformDonationData = ({
    campaignOwnerName,
    chargeDate,
    email,
    firstName,
    fundraiserTitle,
    lastName,
    netPayoutAmount,
    paymentId,
    permalink,
    sourceName
}, volunteers) => {
    const customerName = `${titleCase(firstName)} ${titleCase(lastName)}`;
    const referenceNumber = referenceNumberOrNone(campaignOwnerName, customerName, volunteers);
    const chargeDateMoment = moment(chargeDate, "YYYY-MM-DD");
    return {
        [SALES_RECEIPT_NUMBER.id]: paymentId,
        [CUSTOMER.id]: customerName,
        [SALES_RECEIPT_DATE.id]: chargeDateMoment.format("MM-DD-YYYY"),
        [DEPOSIT_TO.id]: 'Undeposited Funds',
        [PAYMENT_METHOD.id]: 'FB',
        [REFERENCE_NUMBER.id]: referenceNumber,
        [MEMO.id]: permalink,
        [RECEIPT_MESSAGE.id]: 'Thank you for donating to CHEER Seattle!',
        [EMAIL.id]: email,
        [PRODUCT.id]: FB_DONATION_SOURCE_MAP[sourceName],
        [DESCRIPTION.id]: fundraiserTitle,
        [QUALTITY.id]: '1',
        [AMOUNT.id]: netPayoutAmount
    }
};