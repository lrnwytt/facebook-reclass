import { combineReducers } from 'redux';
import { volunteers } from './volunteer_file_upload';
import { facebookDonations } from './facebook_donation_upload';
import { currentStep } from './app';

export const rootReducer = combineReducers({
    currentStep,
    volunteers,
    facebookDonations
});