import {
    FB_DONATION_CSV_MAP,
    FB_DONATION_TRANSFORM_MAP,
    ORDERED_SALES_RECEIPT_HEADERS
} from './constants';
import { transformDonationData } from './transformers';

export const titleCase = (str) => str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const exportTransformedCSV = (facebookDonations) => {
    const customerCSVData = facebookDonations.map((facebookDonation) => {
        return Object.keys(facebookDonation).reduce(function (acc, curr, idx) {
            const columnKey = Object.values(FB_DONATION_TRANSFORM_MAP)[idx].id;
            const cellData = facebookDonation[columnKey];
            return acc ? `${acc},${cellData}` : cellData;
        }, '');
    });
    const salesReceiptCSVData = [ORDERED_SALES_RECEIPT_HEADERS, ...customerCSVData];
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(salesReceiptCSVData.join('\n'));
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
};

export const extractCSVData = ({ csvText, lineTerminator, cellTerminator, volunteers }) => {
    const csvRows = csvText.split(lineTerminator);
    const donationRows = csvRows.slice(1);
    return donationRows.map(donationRow => {
        const donationData = donationRow.split(cellTerminator);
        const extractedDonationData = extractDonationData(donationData);

        return transformDonationData(extractedDonationData, volunteers);
    });
};

export const referenceNumberOrNone = (campaignOwnerName, customerName, volunteers) => {
    if (volunteers.indexOf(customerName) >= 0) {
        return customerName;
    } else if (volunteers.indexOf(campaignOwnerName) >= 0) {
        return campaignOwnerName;
    }
    return '';
}

export const extractDonationData = donationData => donationData.reduce(function (acc, curr, idx) {
    const cellKey = FB_DONATION_CSV_MAP[idx];
    return { ...acc, [cellKey]: curr };
}, {});