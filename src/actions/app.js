import { ACTION_TYPES, DEFAULT_REDUCERS } from '../constants';

export const setCurrentStep = (currentStep = DEFAULT_REDUCERS.CURRENT_STEP) => ({
    type: ACTION_TYPES.SET_CURRENT_STEP,
    currentStep
});