export const ACTION_TYPES = {
    SET_VOLUNTEERS: 'SET_VOLUNTEERS',
    SET_FACEBOOK_DONATIONS: 'SET_FACEBOOK_DONATIONS',
    SET_CURRENT_STEP: 'SET_CURRENT_STEP',
    SET_ACTIVE_DONATION_FOR_ATTRIBUTION: 'SET_ACTIVE_DONATION_FOR_ATTRIBUTION',
    SET_ATTRIBUTION_FOR_DONATION: 'SET_ATTRIBUTION_FOR_DONATION'
};

export const DEFAULT_REDUCERS = {
    VOLUNTEERS: [],
    FACEBOOK_DONATIONS: [],
    CURRENT_STEP: 0,
    ACTIVE_DONATION_FOR_ATTRIBUTION: '',
    ATTRIBUTED_VOLUNTEER: ''
};

export const FB_DONATION_CSV_MAP = [
    'paymentId', // sales receipt number
    'chargeTime', // not used
    'donationAmount', // not used
    'fbFee', // not used
    'netPayoutAmount', // product/service amount
    'payoutCurrency', // not used
    'senderCurrency', // not used
    'taxAmount', // not used
    'taxUSDAmount', // not used
    'chargeActionTime', // not used
    'chargeDate', // sales receipt date
    'firstName', // product/service description
    'lastName', // product/service description
    'email', // product/service description
    'campaignId', // memo
    'fundraiserTitle', // product/service description
    'sourceName', // product/service
    'permalink', // memo
    'charityId', // not used
    'campaignOwnerName', // customer
    'paymentProcessor', // not used
    'matchingDonation', // not used
    'fundraiserType', // not used
    'chargeTimePT' // reference no
];

export const FB_DONATION_TRANSFORM_MAP = {
    SALES_RECEIPT_NUMBER: {
        fieldLabel: 'Sales Receipt No',
        salesReceiptLabel: 'Sales Receipt No',
        id: 'salesReceiptNumber'
    },
    CUSTOMER: {
        fieldLabel: 'Volunteer',
        salesReceiptLabel: 'Customer',
        id: 'customer'
    },
    SALES_RECEIPT_DATE: {
        fieldLabel: 'Sales Receipt Date',
        salesReceiptLabel: 'Sales Receipt Date',
        id: 'salesReceiptDate'
    },
    DEPOSIT_TO: {
        fieldLabel: 'Deposit To',
        salesReceiptLabel: 'Deposit To',
        id: 'depositTo'
    },
    PAYMENT_METHOD: {
        fieldLabel: 'Payment Method',
        salesReceiptLabel: 'Payment Method',
        id: 'paymentMethod'
    },
    REFERENCE_NUMBER: {
        fieldLabel: 'Reference No',
        salesReceiptLabel: 'Reference No',
        id: 'referenceNumber'
    },
    MEMO: {
        fieldLabel: 'Memo',
        salesReceiptLabel: 'Memo',
        id: 'memo'
    },
    RECEIPT_MESSAGE: {
        fieldLabel: 'Message displayed on sales receipt',
        salesReceiptLabel: 'Message displayed on sales receipt',
        id: 'receiptMessage'
    },
    EMAIL: {
        fieldLabel: 'Email',
        salesReceiptLabel: 'Email',
        id: 'email'
    },
    PRODUCT: {
        fieldLabel: 'Product/Service',
        salesReceiptLabel: 'Product/Service',
        id: 'product'
    },
    DESCRIPTION: {
        fieldLabel: 'Product/Service Description',
        salesReceiptLabel: 'Product/Service Description',
        id: 'description'
    },
    QUALTITY: {
        fieldLabel: 'Product/Service Quantity',
        salesReceiptLabel: 'Product/Service Quantity',
        id: 'qualtity'
    },
    AMOUNT: {
        fieldLabel: 'Product/Service Amount',
        salesReceiptLabel: 'Product/Service Amount',
        id: 'amount'
    }
};

export const FB_DONATION_DESCRIPTION_MAP = (saledReceiptNumber) => ({
    salesReceipt: `Sales Receipt | ${saledReceiptNumber}`,
    fbReclass: 'Facebook Donation Reclass'
});

export const ORDERED_SALES_RECEIPT_HEADERS = Object.values(FB_DONATION_TRANSFORM_MAP).map(header => header.salesReceiptLabel).join(',');
