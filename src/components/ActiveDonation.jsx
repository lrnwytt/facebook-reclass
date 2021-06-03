import React from 'react';
import PropTypes from 'prop-types';

import { pluckActiveDonationData } from '../helpers';
import { FB_DONATION_TRANSFORM_MAP } from '../constants';

const DEFAULT = 'DEFAULT';

export const ValunteerDropdown = ({ volunteers, activeDonationData, setAttributionForDonation }) => {
    const { customer, salesReceiptNumber } = activeDonationData;
    return (
        <select onChange={({ target }) => setAttributionForDonation(salesReceiptNumber, target.value)}>
            <option value={DEFAULT} disabled={true} selected={!customer}>Attributed Volunteer</option>
            {
                volunteers.map((volunteer, idx) => {
                    return (
                        <option value={volunteer} key={idx} selected={customer === volunteer}>{volunteer}</option>
                    );
                })
            }
        </select>
    );
}

export const ActiveDonationData = ({ columnData, activeDonationData, volunteers, setAttributionForDonation }) => {
    if (!activeDonationData) {
        return null;
    }
    const columnId = columnData.id;
    const dd = activeDonationData[columnId];
    const dt = columnData.fieldLabel;
    switch (columnId) {
        case FB_DONATION_TRANSFORM_MAP.CUSTOMER.id:
            return (
                <dl className='active-donation__static-data'>
                    <dt>{dt}</dt>
                    <dd>
                        <ValunteerDropdown volunteers={volunteers} activeDonationData={activeDonationData} setAttributionForDonation={setAttributionForDonation} />
                    </dd>
                </dl>
            );
        case FB_DONATION_TRANSFORM_MAP.MEMO.id:
            return (
                <dl className='active-donation__static-data'>
                    <dt>{dt}</dt>
                    <dd>
                        <a href={dd} target='_blank' rel='noopener noreferrer'>Facebook Fundraiser Link</a>
                    </dd>
                </dl>
            );
        default:
            return (
                <dl className='active-donation__static-data'>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                </dl>
            );
    }
};

export const ActiveDonation = ({ facebookDonations, activeDonationForAttribution, volunteers, setAttributionForDonation }) => {
    const activeDonationData = pluckActiveDonationData(facebookDonations, activeDonationForAttribution);
    const DONATION_MAP_WITH_OWNER = {
        CAMPAIGN_OWNER: {
            fieldLabel: 'Campaign Owner',
            salesReceiptLabel: 'Campaign Owner',
            id: 'campaignOwner'
        },
        DONER: {
            fieldLabel: 'Donor',
            salesReceiptLabel: 'Donor',
            id: 'donor'
        },
        ...FB_DONATION_TRANSFORM_MAP
    };
    return (
        <div className='active-donation'>
            {Object.values(DONATION_MAP_WITH_OWNER).map((columnData, idx) => <ActiveDonationData key={idx} columnData={columnData} activeDonationData={activeDonationData} volunteers={volunteers} setAttributionForDonation={setAttributionForDonation} />)}
        </div>
    );
}

ActiveDonation.propTypes = {
    facebookDonations: PropTypes.array.isRequired,
    activeDonationForAttribution: PropTypes.string.isRequired
};