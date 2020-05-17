import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FacebookDonationUpload } from './FacebookDonationUpload';
import { VolunteerFileUpload } from './VolunteerFileUpload'
import { StepList } from './StepList';

import { setVolunteers } from '../actions/volunteer_file_upload';
import { setFacebookDonations } from '../actions/facebook_donactions_upload';
import { setCurrentStep } from '../actions/app';

import { DEFAULT_REDUCERS } from '../constants';

export const Steps = (props) => {
    const {
        currentStep,
        setCurrentStep,
        setFacebookDonations,
        setVolunteers,
        volunteers
    } = props;
    switch (currentStep) {
        case 0:
            return <VolunteerFileUpload setVolunteers={setVolunteers} volunteers={volunteers} setCurrentStep={setCurrentStep} />;
        case 1:
            return <FacebookDonationUpload setFacebookDonations={setFacebookDonations} volunteers={volunteers} setCurrentStep={setCurrentStep} />;
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
    volunteers: DEFAULT_REDUCERS.VOLUNTEERS
};

App.propTypes = {
    volunteers: PropTypes.array,
    currentStep: PropTypes.number
};

const mapStateToProps = state => ({
    volunteers: state.volunteers,
    currentStep: state.currentStep
});

const mapDispatchToProps = dispatch => ({
    setCurrentStep: currentStep => dispatch(setCurrentStep(currentStep)),
    setVolunteers: volunteers => dispatch(setVolunteers(volunteers)),
    setFacebookDonations: facebookDonations => dispatch(setFacebookDonations(facebookDonations))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);