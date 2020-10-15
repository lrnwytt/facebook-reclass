import React from 'react';
import PropTypes from 'prop-types';

import { ActiveDonation } from './ActiveDonation';

export const donationStatus = (donation, activeDonationForAttribution) => {
    if (donation.salesReceiptNumber === activeDonationForAttribution) {
        return 'active';
    } else if (donation.customer) {
        return 'complete';
    }
    return 'incomplete';
}

export const DonationListItem = ({ donation, activeDonationForAttribution, setActiveDonationForAttribution }) => {
    return (
        <li className={`donation donation--${donationStatus(donation, activeDonationForAttribution)}`}>
            <button className={activeDonationForAttribution === donation.salesReceiptNumber && 'active'} onClick={() => setActiveDonationForAttribution(donation.salesReceiptNumber)}>
                <div className={`donation__icon donation__icon--${donation.customer ? 'set' : 'unset'}`}>
                    {donation.customer ? <i className='fa fa-check' /> : <i className='fa fa-times' />}
                </div>
                <div className='donation__info'>
                    <div className='donation__donor'>
                        {donation.donor}
                    </div>
                    <div className='donation__owner'>
                        {donation.customer || 'None'}
                    </div>
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
        </div>
    );
}

DonationAttribution.propTypes = {
    facebookDonations: PropTypes.array.isRequired,
    activeDonationForAttribution: PropTypes.string.isRequired,
    setActiveDonationForAttribution: PropTypes.func.isRequired,
    setCurrentStep: PropTypes.func.isRequired
};