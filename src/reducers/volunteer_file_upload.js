import { ACTION_TYPES, DEFAULT_REDUCERS } from '../common';

export const volunteers = (state = DEFAULT_REDUCERS.VOLUNTEERS, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_VOLUNTEERS:
            return action.volunteers;
        default:
            return state;
    }
};