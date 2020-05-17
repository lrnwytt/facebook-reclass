import { ACTION_TYPES, DEFAULT_REDUCERS } from '../constants';

export const setFacebookDonations = (facebookDonations = DEFAULT_REDUCERS.FACEBOOK_DONATIONS) => ({
    type: ACTION_TYPES.SET_FACEBOOK_DONATIONS,
    facebookDonations
});

export const setActiveDonationForAttribution = (donation = DEFAULT_REDUCERS.ACTIVE_DONATION_FOR_ATTRIBUTION) => ({
    type: ACTION_TYPES.SET_ACTIVE_DONATION_FOR_ATTRIBUTION,
    donation
});