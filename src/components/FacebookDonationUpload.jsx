import React from 'react';
import PropTypes from 'prop-types';

import { extractCSVData } from '../helpers';

export class FacebookDonationUpload extends React.Component {
    constructor() {
        super();
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    onFileUpload(file) {
        const { setFacebookDonations, volunteers } = this.props;

        const fileReader = new FileReader();
        fileReader.onload = ({ target }) => {
            const facebookDonations = extractCSVData({
                csvText: target.result,
                lineTerminator: '\n',
                cellTerminator: ',',
                volunteers
            });
            setFacebookDonations(facebookDonations);
        }
        fileReader.readAsText(file);
    }

    render() {
        window.volunteers = this.props.volunteers;
        return (
            <div className='donation-uploader__container'>
                <input type='file' onChange={({ target }) => this.onFileUpload(target.files[0])} />
            </div>
        );
    }
}

FacebookDonationUpload.propTypes = {
    volunteers: PropTypes.array.isRequired
};
