import React from 'react';
import PropTypes from 'prop-types';

const STEPS = [
    'Volunteer List Upload',
    'Facebook Donation Upload',
    'Contribution Attribution',
    'Final Review'
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