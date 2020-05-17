import { ACTION_TYPES, DEFAULT_REDUCERS } from '../constants';

export const facebookDonations = (state = DEFAULT_REDUCERS.FACEBOOK_DONATIONS, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_FACEBOOK_DONATIONS:
            return action.facebookDonations;
        case ACTION_TYPES.SET_ATTRIBUTION_FOR_DONATION:
            const newState = [...state];
            return newState.reduce((acc, curr) => {
                const newDonation = { ...curr };
                if (curr.salesReceiptNumber === action.salesReceiptNumber) {
                    newDonation.referenceNumber = action.volunteer;
                }
                return [...acc, newDonation];
            }, []);
        default:
            return state;
    }
};

export const activeDonationForAttribution = (state = DEFAULT_REDUCERS.ACTIVE_DONATION_FOR_ATTRIBUTION, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_ACTIVE_DONATION_FOR_ATTRIBUTION:
            return action.donation;
        default:
            return state;
    }
};