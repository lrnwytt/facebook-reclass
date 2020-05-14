import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { VolunteerFileUpload } from './VolunteerFileUpload';
import { VolunteerList } from './VolunteerList';

import { setVolunteers } from '../actions/volunteer_file_upload';

export const App = (props) => {
    const { setVolunteers, volunteers } = props;
    return (
        <div className='app'>
            <div className='volunteer-uploader'>
                <VolunteerFileUpload setVolunteers={setVolunteers} volunteers={volunteers} />
                <VolunteerList volunteers={volunteers} />
            </div>
        </div>
    );
}

App.defaultProps = {
    volunteers: []
};

App.propTypes = {
    volunteers: PropTypes.array,
};

const mapStateToProps = state => ({
    volunteers: state.volunteers
});

const mapDispatchToProps = dispatch => ({
    setVolunteers: volunteers => dispatch(setVolunteers(volunteers))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);