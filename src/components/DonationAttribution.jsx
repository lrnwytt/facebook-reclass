import React from 'react';
import PropTypes from 'prop-types';

export const donationStatus = (donation, activeDonationForAttribution) => {
    if (donation.salesReceiptNumber === activeDonationForAttribution) {
        return 'active';
    } else if (donation.referenceNumber) {
        return 'complete';
    }
    return 'incomplete';
}

export const DonationListItem = ({ donation, activeDonationForAttribution }) => {
    return (
        <li className={`donation donation--${donationStatus(donation, activeDonationForAttribution)}`}>
            <div className='donation__donor'>
                {donation.customer}
            </div>
            <div className='donation__owner'>
                {donation.referenceNumber || 'None'}
            </div>
        </li>
    );
};

export const DonationAttribution = ({ facebookDonations, activeDonationForAttribution }) => {
    return (
        <div className='donation-attribution'>
            <ol className='donation-attribution__donations'>
                {
                    facebookDonations.map((donation) => <DonationListItem donation={donation} activeDonationForAttribution={activeDonationForAttribution} key={donation.salesReceiptNumber} />)
                }
            </ol>
        </div>
    );
}

DonationAttribution.propTypes = {
    facebookDonations: PropTypes.array.isRequired
};