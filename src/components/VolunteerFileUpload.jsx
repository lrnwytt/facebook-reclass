import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';

import { VolunteerList } from './VolunteerList';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'rgb(217, 224, 231)',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'rgb(143, 157, 169)',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export const BasicDropzone = ({ onFileUpload }) => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDropAccepted: (files) => onFileUpload(files[0])
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone', style })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        </section>
    );
}

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

            const unattributedVolunteer = 'Cheer Seattle';
            setVolunteers([unattributedVolunteer, ...volunteers]);
        }
        fileReader.readAsArrayBuffer(file);
    }

    render() {
        const { setCurrentStep, volunteers } = this.props;
        return (
            <div className='volunteer-uploader'>
                <div className='section-container'>
                    <div className='volunteer-uploader__instructions'>
                        <p>
                            In order to assign volunteers to donations, we need a list of current volunteers. You can get a list of current volunteers in Quickbooks > Reports and searching for "Current Volunteer List" or by clicking <a href='https://c40.qbo.intuit.com/app/reportv2?mem_rpt_id=125&edited_sections=false' target="_blank" rel="noopener noreferrer">here</a>.
                        </p>
                        <p>
                            Once you have the current list, upload it here. Verify the information looks correct, then click "Next" to go to the next section.
                        </p>
                    </div>
                    <BasicDropzone onFileUpload={this.onFileUpload} />
                </div>
                {volunteers.length !== 0 && <VolunteerList volunteers={volunteers} />}
                <div className='button-container'>
                    <button disabled={!volunteers.length} className={`${!volunteers.length && 'disabled'}`} onClick={() => setCurrentStep(1)}>Next</button>
                </div>
            </div>
        );
    }
}

VolunteerFileUpload.propTypes = {
    volunteers: PropTypes.array.isRequired,
    setVolunteers: PropTypes.func.isRequired
};
