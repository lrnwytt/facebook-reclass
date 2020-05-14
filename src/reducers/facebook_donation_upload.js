import { ACTION_TYPES, DEFAULT_REDUCERS } from '../constants';

export const facebookDonations = (state = DEFAULT_REDUCERS.FACEBOOK_DONATIONS, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_FACEBOOK_DONATIONS:
            return action.facebookDonations;
        default:
            return state;
    }
};