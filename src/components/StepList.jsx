import React from 'react';
import PropTypes from 'prop-types';

const STEPS = [
    'Volunteer List Upload', // upload volunteer list to store for dropdowns
    'Facebook Donation Upload', // upload fb donations from facebook
    'Contribution Attribution', // select members to attribute donations to
    'Final Review' // upload facebook fundraiser report
];

export const stepStatus = (currentStep, stepId) => {
    if (stepId === currentStep) {
        return 'active';
    } else if (stepId < currentStep) {
        return 'complete';
    }
    return 'incomplete';
}

export const StepListItem = ({ currentStep, step, stepId }) => {
    return (
        <li className={`step-list__step step-list__step--${stepStatus(currentStep, stepId)}`}>{step}</li>
    );
};

export const StepList = ({ currentStep }) => {
    return (
        <div className='step-list'>
            <ol className='step-list__steps'>
                {
                    STEPS.map((step, idx) => <StepListItem step={step} currentStep={currentStep} stepId={idx} key={idx} />)
                }
            </ol>
        </div>
    );
}

StepList.propTypes = {
    currentStep: PropTypes.number.isRequired
};