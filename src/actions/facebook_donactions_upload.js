import { ACTION_TYPES, DEFAULT_REDUCERS } from '../constants';

export const setFacebookDonations = (facebookDonations = DEFAULT_REDUCERS.FACEBOOK_DONATIONS) => ({
    type: ACTION_TYPES.SET_FACEBOOK_DONATIONS,
    facebookDonations
});

export const setAttributionForDonation = (salesReceiptNumber, volunteer = DEFAULT_REDUCERS.ATTRIBUTED_VOLUNTEER) => ({
    type: ACTION_TYPES.SET_ATTRIBUTION_FOR_DONATION,
    salesReceiptNumber,
    volunteer
});

export const setActiveDonationForAttribution = (donation = DEFAULT_REDUCERS.ACTIVE_DONATION_FOR_ATTRIBUTION) => ({
    type: ACTION_TYPES.SET_ACTIVE_DONATION_FOR_ATTRIBUTION,
    donation
});