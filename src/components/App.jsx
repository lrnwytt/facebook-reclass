import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FacebookDonationUpload } from './FacebookDonationUpload';
import { VolunteerFileUpload } from './VolunteerFileUpload'
import { StepList } from './StepList';
import { DonationAttribution } from './DonationAttribution';

import { setVolunteers } from '../actions/volunteer_file_upload';
import { setFacebookDonations, setActiveDonationForAttribution, setAttributionForDonation } from '../actions/facebook_donactions_upload';
import { setCurrentStep } from '../actions/app';

import { DEFAULT_REDUCERS } from '../constants';

export const Steps = ({
    activeDonationForAttribution,
    currentStep,
    setCurrentStep,
    setFacebookDonations,
    setVolunteers,
    volunteers,
    facebookDonations,
    setActiveDonationForAttribution,
    setAttributionForDonation
}) => {
    switch (currentStep) {
        case 0:
            return <VolunteerFileUpload setVolunteers={setVolunteers} volunteers={volunteers} setCurrentStep={setCurrentStep} />;
        case 1:
            return <FacebookDonationUpload setFacebookDonations={setFacebookDonations} volunteers={volunteers} setCurrentStep={setCurrentStep} setActiveDonationForAttribution={setActiveDonationForAttribution} />;
        case 2:
            return <DonationAttribution setAttributionForDonation={setAttributionForDonation} volunteers={volunteers} facebookDonations={facebookDonations} setActiveDonationForAttribution={setActiveDonationForAttribution} activeDonationForAttribution={activeDonationForAttribution} />;
        default:
            return null;
    }
};

export const App = (props) => {
    const { currentStep } = props;
    return (
        <div className='app'>
            <StepList currentStep={currentStep} />
            <Steps {...props} />
        </div>
    );
}

App.defaultProps = {
    currentStep: DEFAULT_REDUCERS.CURRENT_STEP,
    volunteers: DEFAULT_REDUCERS.VOLUNTEERS,
    facebookDonations: DEFAULT_REDUCERS.FACEBOOK_DONATIONS,
    activeDonationForAttribution: DEFAULT_REDUCERS.ACTIVE_DONATION_FOR_ATTRIBUTION
};

App.propTypes = {
    volunteers: PropTypes.array,
    currentStep: PropTypes.number,
    facebookDonations: PropTypes.array,
    activeDonationForAttribution: PropTypes.string
};

const mapStateToProps = state => ({
    volunteers: state.volunteers,
    currentStep: state.currentStep,
    facebookDonations: state.facebookDonations,
    activeDonationForAttribution: state.activeDonationForAttribution
});

const mapDispatchToProps = dispatch => ({
    setCurrentStep: currentStep => dispatch(setCurrentStep(currentStep)),
    setVolunteers: volunteers => dispatch(setVolunteers(volunteers)),
    setFacebookDonations: facebookDonations => dispatch(setFacebookDonations(facebookDonations)),
    setActiveDonationForAttribution: donation => dispatch(setActiveDonationForAttribution(donation)),
    setAttributionForDonation: (salesReceiptNumber, volunteer) => dispatch(setAttributionForDonation(salesReceiptNumber, volunteer))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);