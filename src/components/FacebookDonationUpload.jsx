import React from 'react';
import PropTypes from 'prop-types';

import { extractCSVData, determineFirstIncompleteDonation } from '../helpers';

export class FacebookDonationUpload extends React.Component {
    constructor() {
        super();
        this.onFileUpload = this.onFileUpload.bind(this);
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
            setFacebookDonations(facebookDonations);
            setActiveDonationForAttribution(determineFirstIncompleteDonation(facebookDonations));
        }
        fileReader.readAsText(file);
    }

    render() {
        const { setCurrentStep } = this.props;
        return (
            <div className='donation-uploader'>
                <input type='file' onChange={({ target }) => this.onFileUpload(target.files[0])} />
                <button onClick={() => setCurrentStep(2)}>Next</button>
            </div>
        );
    }
}

FacebookDonationUpload.propTypes = {
    volunteers: PropTypes.array.isRequired,
    setCurrentStep: PropTypes.func.isRequired
};
