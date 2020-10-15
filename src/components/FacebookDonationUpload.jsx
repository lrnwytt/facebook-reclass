import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { DonationAttribution } from './DonationAttribution';
import { extractCSVData, determineFirstIncompleteDonation, exportSalesReceiptCSV } from '../helpers';

export const pluckVolunteers = (facebookDonations) => {
    const volunteerList = facebookDonations.map(facebookDonation => facebookDonation.customer);
    return [...new Set(volunteerList)];
}

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
        exportSalesReceiptCSV(facebookDonations);
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
                    <button
                        disabled={firstIncompleteDonation || !facebookDonations.length}
                        className={`${(firstIncompleteDonation || !facebookDonations.length) && 'disabled'}`}
                        onClick={this.onDownload}
                    >
                            Download
                    </button>
                </div>
            </div>
        );
    }
}

FacebookDonationUpload.propTypes = {
    volunteers: PropTypes.array.isRequired,
    setCurrentStep: PropTypes.func.isRequired
};
