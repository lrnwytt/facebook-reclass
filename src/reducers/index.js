import { combineReducers } from 'redux';
import { volunteers } from './volunteer_file_upload';
import { facebookDonations } from './facebook_donation_upload';

export const rootReducer = combineReducers({
    volunteers,
    facebookDonations
});