import {
    FB_DONATION_CSV_MAP,
    FB_DONATION_TRANSFORM_MAP,
    ORDERED_SALES_RECEIPT_HEADERS,
    DEFAULT_REDUCERS
} from './constants';
import { transformDonationData } from './transformers';

export const titleCase = (str) => str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const exportSalesReceiptCSV = (facebookDonations) => {
    const customerCSVData = facebookDonations.map((facebookDonation) => {
        return Object.keys(facebookDonation).reduce((acc, curr, idx) => {
            if (Object.values(FB_DONATION_TRANSFORM_MAP)[idx]) {
                const columnKey = Object.values(FB_DONATION_TRANSFORM_MAP)[idx].id;
                const cellData = facebookDonation[columnKey];
                return acc ? `${acc},${cellData}` : cellData;
            }
            return acc;
        }, '');
    });
    const salesReceiptCSVData = [ORDERED_SALES_RECEIPT_HEADERS, ...customerCSVData];
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(salesReceiptCSVData.join('\n'));
    hiddenElement.target = '_blank';
    hiddenElement.download = 'sales_receipts.csv';
    hiddenElement.click();
};

export const extractCSVData = ({ csvText, lineTerminator, cellTerminator, volunteers }) => {
    const csvRows = csvText.split(lineTerminator);
    const donationRows = csvRows.slice(1);
    return donationRows.map(donationRow => {
        const donationData = donationRow.split(cellTerminator);
        const extractedDonationData = extractDonationData(donationData);

        const transformmedDonationData = transformDonationData(extractedDonationData, volunteers);
        return transformmedDonationData;
    });
};

export const volunteerOrNone = (campaignOwnerName, customerName, volunteers) => {
    if (volunteers.indexOf(customerName) >= 0) {
        return customerName;
    } else if (volunteers.indexOf(campaignOwnerName) >= 0) {
        return campaignOwnerName;
    }
    return '';
}

export const extractDonationData = donationData => donationData.reduce((acc, curr, idx) => {
    const cellKey = FB_DONATION_CSV_MAP[idx];
    return { ...acc, [cellKey]: curr };
}, {});

export const determineFirstIncompleteDonation = donations => {
    const incompleteDonation = donations.find(donation => !donation.customer);
    return (incompleteDonation && incompleteDonation.salesReceiptNumber) || DEFAULT_REDUCERS.ACTIVE_DONATION_FOR_ATTRIBUTION
};

export const pluckActiveDonationData = (donations, activeDonationForAttribution) => donations.find(donation => donation.salesReceiptNumber === activeDonationForAttribution);
