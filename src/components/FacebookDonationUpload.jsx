import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDropzone } from 'react-dropzone';

import { DonationAttribution } from './DonationAttribution';

import { FB_DONATION_JOURNAL_ENTRY_MAP, FB_DONATION_ACCOUNT_MAP, FB_DONATION_DESCRIPTION_MAP } from '../constants';
import { extractCSVData, determineFirstIncompleteDonation, exportJounralEntryCSV, exportSalesReceiptCSV } from '../helpers';

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

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'rgb(217, 224, 231)',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'rgb(143, 157, 169)',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export const BasicDropzone = ({ onFileUpload }) => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDropAccepted: (files) => onFileUpload(files[0])
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone', style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </section>
    );
}

export class FacebookDonationUpload extends React.Component {
    constructor() {
        super();
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onDownload = this.onDownload.bind(this);
    }

    onFileUpload(file) {
        const { setFacebookDonations, volunteers, setActiveDonationForAttribution } = this.props;

        const fileReader = new FileReader();
        fileReader.onload = ({ target }) => {
            const facebookDonations = extractCSVData({
                csvText: target.result,
                lineTerminator: '\n',
                cellTerminator: ',',
                volunteers
            });
            setActiveDonationForAttribution(determineFirstIncompleteDonation(facebookDonations));
            setFacebookDonations(facebookDonations);
        }
        fileReader.readAsText(file);
    }

    onDownload() {
        const { facebookDonations } = this.props;
        const journalEntry = generateJournalEntryTable(facebookDonations);
        exportSalesReceiptCSV(facebookDonations);
        exportJounralEntryCSV(journalEntry);
    }

    render() {
        const { setCurrentStep, setAttributionForDonation, volunteers, facebookDonations, setActiveDonationForAttribution, activeDonationForAttribution } = this.props;
        const firstIncompleteDonation = determineFirstIncompleteDonation(facebookDonations);
        return (
            <div className='donation-uploader'>
                <div className='section-container'>
                    <div className='donation-uploader__instructions'>
                        <p>
                            The Facebook Transaction Report can be uploaded here. Once uploaded you can assign volunteers as the owners for each donation.
                        </p>
                        <p>
                            Once you have finished assigning volunteers, the download button will appear and you will be able to downlaod your Journal Entries and Sales Receipts to upload to Quickbooks.
                        </p>
                    </div>
                    <BasicDropzone onFileUpload={this.onFileUpload} />
                </div>
                {facebookDonations.length !== 0 && <DonationAttribution setCurrentStep={setCurrentStep} setAttributionForDonation={setAttributionForDonation} volunteers={volunteers} facebookDonations={facebookDonations} setActiveDonationForAttribution={setActiveDonationForAttribution} activeDonationForAttribution={activeDonationForAttribution} />}
                <div className='button-container'>
                    <button disabled={firstIncompleteDonation || !facebookDonations.length} className={`${(firstIncompleteDonation || !facebookDonations.length) && 'disabled'}`} onClick={this.onDownload}>Download</button>
                </div>
            </div>
        );
    }
}

FacebookDonationUpload.propTypes = {
    volunteers: PropTypes.array.isRequired,
    setCurrentStep: PropTypes.func.isRequired
};
