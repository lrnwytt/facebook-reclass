import { ACTION_TYPES, DEFAULT_REDUCERS } from '../constants';

export const setFacebookDonations = (facebookDonations = DEFAULT_REDUCERS.FACEBOOK_DONATIONS) => ({
    type: ACTION_TYPES.SET_FACEBOOK_DONATIONS,
    facebookDonations
});