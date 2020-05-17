export const ACTION_TYPES = {
    SET_VOLUNTEERS: 'SET_VOLUNTEERS',
    SET_FACEBOOK_DONATIONS: 'SET_FACEBOOK_DONATIONS',
    SET_CURRENT_STEP: 'SET_CURRENT_STEP',
    SET_ACTIVE_DONATION_FOR_ATTRIBUTION: 'SET_ACTIVE_DONATION_FOR_ATTRIBUTION'
};

export const DEFAULT_REDUCERS = {
    VOLUNTEERS: [],
    FACEBOOK_DONATIONS: [],
    CURRENT_STEP: 0,
    ACTIVE_DONATION_FOR_ATTRIBUTION: ''
};

export const FB_DONATION_CSV_MAP = [
    'paymentId',
    'chargeTime',
    'donationAmount',
    'fbFee',
    'netPayoutAmount',
    'payoutCurrency',
    'senderCurrency',
    'taxAmount',
    'taxUSDAmount',
    'chargeActionTime',
    'chargeDate',
    'firstName',
    'lastName',
    'email',
    'campaignId',
    'fundraiserTitle',
    'sourceName',
    'permalink',
    'charityId',
    'campaignOwnerName',
    'paymentProcessor',
    'matchingDonation',
    'fundraiserType',
    'chargeTimePT'
];

export const FB_DONATION_TRANSFORM_MAP = {
    SALES_RECEIPT_NUMBER: {
        label: 'Sales Receipt No',
        id: 'salesReceiptNumber'
    },
    CUSTOMER: {
        label: 'Customer',
        id: 'customer'
    },
    SALES_RECEIPT_DATE: {
        label: 'Sales Receipt Date',
        id: 'salesReceiptDate'
    },
    DEPOSIT_TO: {
        label: 'Deposit To',
        id: 'depositTo'
    },
    PAYMENT_METHOD: {
        label: 'Payment Method',
        id: 'paymentMethod'
    },
    REFERENCE_NUMBER: {
        label: 'Reference No',
        id: 'referenceNumber'
    },
    MEMO: {
        label: 'Memo',
        id: 'memo'
    },
    RECEIPT_MESSAGE: {
        label: 'Message displayed on sales receipt',
        id: 'receiptMessage'
    },
    EMAIL: {
        label: 'Email',
        id: 'email'
    },
    PRODUCT: {
        label: 'Product/Service',
        id: 'product'
    },
    DESCRIPTION: {
        label: 'Product/Service Description',
        id: 'description'
    },
    QUALTITY: {
        label: 'Product/Service Quantity',
        id: 'qualtity'
    },
    AMOUNT: {
        label: 'Product/Service Amount',
        id: 'amount'
    }
};

export const FB_DONATION_SOURCE_MAP = {
    fundraiser: '1) Donations:FB Donations - Fundraiser',
    donate_button_user_posts: '1) Donations:FB Donations - Button'
};

export const ORDERED_SALES_RECEIPT_HEADERS = Object.values(FB_DONATION_TRANSFORM_MAP).map(header => header.label).join(',');