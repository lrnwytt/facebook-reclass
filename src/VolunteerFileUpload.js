import React from 'react';
import XLSX from 'xlsx';

export const extractVolunteers = (worksheet) => {
  let volunteers = [];
  for (let key in worksheet) {
    let regEx = new RegExp("^B\\d+$");
    if (regEx.test(key) === true && worksheet[key].v !== 'Customer') {
      volunteers.push(worksheet[key].v);
    }
  }
  console.log(volunteers);
};

export class VolunteerFileUpload extends React.Component {
  constructor() {
    super();
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  onFileUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetname = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetname];
      extractVolunteers(worksheet);
    }
    reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <div id="VolunteerFileUpload">
        <div className="file-uploader">
          <input type="file" id="file-selector" onChange={this.onFileUpload} />
        </div>
      </div>
    );
  }
}

export default VolunteerFileUpload;
