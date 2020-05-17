import { ACTION_TYPES, DEFAULT_REDUCERS } from '../constants';

export const currentStep = (state = DEFAULT_REDUCERS.CURRENT_STEP, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_CURRENT_STEP:
            return action.currentStep;
        default:
            return state;
    }
};