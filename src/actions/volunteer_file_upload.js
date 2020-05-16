import { ACTION_TYPES, DEFAULT_REDUCERS } from '../constants';

export const setVolunteers = (volunteers = DEFAULT_REDUCERS.VOLUNTEERS) => ({
    type: ACTION_TYPES.SET_VOLUNTEERS,
    volunteers
});