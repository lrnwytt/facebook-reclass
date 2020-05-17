import React from 'react';
import PropTypes from 'prop-types';

import { ActiveDonation } from './ActiveDonation';

export const donationStatus = (donation, activeDonationForAttribution) => {
    if (donation.salesReceiptNumber === activeDonationForAttribution) {
        return 'active';
    } else if (donation.referenceNumber) {
        return 'complete';
    }
    return 'incomplete';
}

export const DonationListItem = ({ donation, activeDonationForAttribution, setActiveDonationForAttribution }) => {
    return (
        <li className={`donation donation--${donationStatus(donation, activeDonationForAttribution)}`}>
            <button onClick={() => setActiveDonationForAttribution(donation.salesReceiptNumber)}>
                <div className='donation__donor'>
                    {donation.customer}
                </div>
                <div className='donation__owner'>
                    {donation.referenceNumber || 'None'}
                </div>
            </button>
        </li>
    );
};

export const DonationAttribution = ({ setAttributionForDonation, facebookDonations, activeDonationForAttribution, setActiveDonationForAttribution, volunteers, setCurrentStep }) => {
    return (
        <div className='donation-attribution'>
            <ol className='donation-attribution__donations'>
                {
                    facebookDonations.map((donation) => <DonationListItem donation={donation} activeDonationForAttribution={activeDonationForAttribution} setActiveDonationForAttribution={setActiveDonationForAttribution} key={donation.salesReceiptNumber} />)
                }
            </ol>
            <ActiveDonation setAttributionForDonation={setAttributionForDonation} volunteers={volunteers} facebookDonations={facebookDonations} activeDonationForAttribution={activeDonationForAttribution} />
            <button onClick={() => setCurrentStep(3)}>Next</button>
        </div>
    );
}

DonationAttribution.propTypes = {
    facebookDonations: PropTypes.array.isRequired,
    activeDonationForAttribution: PropTypes.string.isRequired,
    setActiveDonationForAttribution: PropTypes.func.isRequired,
    setCurrentStep: PropTypes.func.isRequired
};