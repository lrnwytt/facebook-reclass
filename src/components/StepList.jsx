import React from 'react';
import PropTypes from 'prop-types';

const STEPS = [
    'Upload Volunteer List',
    'Upload Facebook Donations',
    'Assign Volunteer to Donations',
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

export const StepListItem = (props) => {
    const { currentStep, step, stepId } = props;
    return (
        <li className={`step-list__step step-list__step--${stepStatus(currentStep, stepId)}`}>{step}</li>
    );
};

export const StepList = (props) => {
    const { currentStep } = props;
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