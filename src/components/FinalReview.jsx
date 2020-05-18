import React from 'react';
import moment from 'moment';
import { FB_DONATION_JOURNAL_ENTRY_MAP, FB_DONATION_ACCOUNT_MAP, FB_DONATION_DESCRIPTION_MAP } from '../constants';
import { exportSalesReceiptCSV, exportJounralEntryCSV } from '../helpers';

const {
    JOURNAL_NUMBER,
    JOURNAL_DATE,
    ACCOUNT,
    AMOUNT,
    DESCRIPTION,
    NAME
} = FB_DONATION_JOURNAL_ENTRY_MAP;

export const generatePublicDonations = (facebookDonations) => facebookDonations.map(facebookDonation => {
    const { salesReceiptDate, salesReceiptNumber, amount, customer } = facebookDonation;
    const salesReceiptDateMoment = moment(salesReceiptDate, "YYYY-MM-DD");
    const journalEntryData = {
        [JOURNAL_NUMBER.id]: `${salesReceiptDateMoment.format("YYYYMM") + salesReceiptDateMoment.daysInMonth()}_FB_RECLASS`,
        [JOURNAL_DATE.id]: salesReceiptDateMoment.format("MM-") + salesReceiptDateMoment.daysInMonth() + salesReceiptDateMoment.format("-YYYY"),
        [ACCOUNT.id]: FB_DONATION_ACCOUNT_MAP.publicDonations,
        [AMOUNT.id]: amount,
        [DESCRIPTION.id]: FB_DONATION_DESCRIPTION_MAP(salesReceiptNumber).salesReceipt,
        [NAME.id]: customer
    };
    return journalEntryData;
});

export const generateAccountsReceivable = (facebookDonations) => {
    const { salesReceiptDate } = facebookDonations[0];
    const salesReceiptDateMoment = moment(salesReceiptDate, "YYYY-MM-DD");
    const dedupedVolunteers = pluckVolunteers(facebookDonations);
    return dedupedVolunteers.map(volunteer => {

        const totalCredit = facebookDonations.reduce(function (acc, curr) {
            return curr.referenceNumber === volunteer ? acc + parseInt(curr.amount, 10) : acc;
        }, 0)

        return {
            [JOURNAL_NUMBER.id]: `${salesReceiptDateMoment.format("YYYYMM") + salesReceiptDateMoment.daysInMonth()}_FB_RECLASS`,
            [JOURNAL_DATE.id]: salesReceiptDateMoment.format("MM-") + salesReceiptDateMoment.daysInMonth() + salesReceiptDateMoment.format("-YYYY"),
            [ACCOUNT.id]: FB_DONATION_ACCOUNT_MAP.accountsReceivable,
            [AMOUNT.id]: totalCredit * -1,
            [DESCRIPTION.id]: FB_DONATION_DESCRIPTION_MAP().fbReclass,
            [NAME.id]: volunteer
        };
    });
};

export const pluckVolunteers = (facebookDonations) => {
    const volunteerList = facebookDonations.map(facebookDonation => facebookDonation.referenceNumber);
    return [...new Set(volunteerList)];
}

export const generateJournalEntryTable = (facebookDonations) => {
    const publicDonations = generatePublicDonations(facebookDonations);
    const accountsReceivable = generateAccountsReceivable(facebookDonations);
    return [...publicDonations, ...accountsReceivable]
};

export const FinalReview = ({ facebookDonations }) => {
    const journalEntry = generateJournalEntryTable(facebookDonations);
    exportSalesReceiptCSV(facebookDonations);
    exportJounralEntryCSV(journalEntry);
    return (
        <div className='final-review'>
            hello
        </div>
    );
};

