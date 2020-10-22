import moment from 'moment';
import {
    FB_DONATION_TRANSFORM_MAP
} from './constants';
import { titleCase, volunteerOrNone } from './helpers';

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
    chargeTime,
    chargeTimePT,
    email,
    firstName,
    fundraiserTitle,
    lastName,
    netPayoutAmount,
    paymentId,
    permalink,
    sourceName
}, volunteers) => {
    const donorName = `${titleCase(firstName)} ${titleCase(lastName)}`;
    const volunteer = volunteerOrNone(campaignOwnerName, donorName, volunteers);
    const chargeDateMoment = moment(chargeDate, 'YYYY-MM-DD');
    return {
        [SALES_RECEIPT_NUMBER.id]: paymentId,
        [CUSTOMER.id]: volunteer,
        [SALES_RECEIPT_DATE.id]: chargeDateMoment.format('MM-DD-YYYY'),
        [DEPOSIT_TO.id]: 'Undeposited Funds',
        [PAYMENT_METHOD.id]: 'FB',
        [REFERENCE_NUMBER.id]: chargeTime,
        [MEMO.id]: permalink,
        [RECEIPT_MESSAGE.id]: fundraiserTitle,
        [EMAIL.id]: '',
        [PRODUCT.id]: sourceName,
        [DESCRIPTION.id]: `Facebook Donation from ${donorName}${ emailOrNone(email) }`,
        [QUALTITY.id]: '1',
        [AMOUNT.id]: netPayoutAmount,
        campaignOwner: campaignOwnerName,
        donor: donorName
    }
};

export const emailOrNone = (email) => email ? ` ${email}` : '';