import React from 'react';
import PropTypes from 'prop-types';

const STEPS = [
    'Volunteer List Upload', // upload volunteer list to store for dropdowns
    'Facebook Donation Upload', // upload fb donations from facebook
    'Contribution Attribution', // select members to attribute donations to
    'Final Review' // upload facebook fundraiser report
];

const STEP_STATUS = {
    ACTIVE: 'active',
    COMPLETE: 'complete',
    INCOMPLETE: 'incomplete'
};

export const stepStatus = (currentStep, stepId) => {
    if (stepId === currentStep) {
        return STEP_STATUS.ACTIVE;
    } else if (stepId < currentStep) {
        return STEP_STATUS.COMPLETE;
    }
    return STEP_STATUS.INCOMPLETE;
}

export const StepStatusIndicator = ({ currentStepStatus, stepId }) => {
    switch (currentStepStatus) {
        case STEP_STATUS.ACTIVE:
        case STEP_STATUS.INCOMPLETE:
            return <span className='step-list__step-indicator'>{stepId + 1}</span>;
        case STEP_STATUS.COMPLETE:
            return <span className='step-list__step-indicator'><i className='fa fa-check' /></span>;
        default:
            return null;
    }
};

export const StepListItem = ({ currentStep, step, stepId }) => {
    const currentStepStatus = stepStatus(currentStep, stepId);
    return (
        <li className={`step-list__step step-list__step--${currentStepStatus}`}>
            <StepStatusIndicator currentStepStatus={currentStepStatus} stepId={stepId} />
            <span className='step-list__step-label'>{step}</span>
            {stepId < 3 && <span className='step-list__divider-line' />}
        </li>
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