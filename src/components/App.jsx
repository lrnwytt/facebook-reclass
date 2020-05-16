import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FacebookDonationUpload } from './FacebookDonationUpload';
import { VolunteerFileUpload } from './VolunteerFileUpload';
import { VolunteerList } from './VolunteerList';

import { setVolunteers } from '../actions/volunteer_file_upload';
import { setFacebookDonations } from '../actions/facebook_donactions_upload';

export const App = (props) => {
    const {
        setFacebookDonations,
        setVolunteers,
        volunteers
    } = props;
    return (
        <div className='app'>
            <div className='volunteer-uploader'>
                <VolunteerFileUpload setVolunteers={setVolunteers} volunteers={volunteers} />
                <VolunteerList volunteers={volunteers} />
                <FacebookDonationUpload setFacebookDonations={setFacebookDonations} volunteers={volunteers} />
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
    setVolunteers: volunteers => dispatch(setVolunteers(volunteers)),
    setFacebookDonations: facebookDonations => dispatch(setFacebookDonations(facebookDonations))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);