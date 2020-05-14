import React from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';

export const extractVolunteers = worksheet => {
    let volunteers = [];
    for (let key in worksheet) {
        let regEx = new RegExp('^B\\d+$');
        if (regEx.test(key) === true && worksheet[key].v !== 'Customer') {
            volunteers.push(worksheet[key].v);
        }
    }
    return volunteers;
};

export class VolunteerFileUpload extends React.Component {
    constructor() {
        super();
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    onFileUpload(file) {
        const { setVolunteers } = this.props;

        const fileReader = new FileReader();
        fileReader.onload = ({ target }) => {
            const data = new Uint8Array(target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetname = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetname];
            const volunteers = extractVolunteers(worksheet);

            setVolunteers(volunteers);
        }
        fileReader.readAsArrayBuffer(file);
    }

    render() {
        return (
            <div className='volunteer-uploader__container'>
                <input type='file' onChange={({ target }) => this.onFileUpload(target.files[0])} />
            </div>
        );
    }
}

VolunteerFileUpload.propTypes = {
    volunteers: PropTypes.array.isRequired,
    setVolunteers: PropTypes.func.isRequired
};