import React from 'react';
import PropTypes from 'prop-types';

export const VolunteerListItem = (props) => {
    return (
        <li className='volunteer-list__volunteer'>{props.volunteer}</li>
    );
};

export const VolunteerList = (props) => {
    const { volunteers } = props;
    return (
        <div className='volunteer-list'>
            <ol className='volunteer-list__volunteers'>
                {
                    volunteers.map(volunteer => <VolunteerListItem volunteer={volunteer} />)
                }
            </ol>
        </div>
    );
}

VolunteerList.propTypes = {
    volunteers: PropTypes.array.isRequired
};