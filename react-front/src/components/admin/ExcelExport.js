import React from "react";
import {utils, write} from "xlsx";

export default class ExcelExport extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      
    }
  }

  exportToExcel = () => {
    // const data = [
    //   ['John Doe', 30, 'Male'],
    //   ['Jane Smith', 25, 'Female'],
    //   ['Bob Johnson', 45, 'Male']
    // ];

     // obtener los datos de la tabla HTML
     const table = document.getElementById('myTable');
     const rows = table.querySelectorAll('tr');
     const data = [];
     rows.forEach((row) => {
       const rowData = [];
       const cells = row.querySelectorAll('td');
       cells.forEach((cell) => {
         rowData.push(cell.innerText);
       });
       data.push(rowData);
     });
 

    // const header = ['Name', 'Age', 'Gender'];
    let header = Object.keys(this.props.dataKeysBeneficiaries);
       header = ["#",...header];
   
    const config = {
      origin: "B2",
      header,
      headerStyle:{
        fill: {
          fgColor: { rgb: "#FF0000" }
        },
        font: {
          color: { rgb: "#FFFFFF" },
          sz: 20,
          bold: true
        }
      }
    };

    const workbook = utils.book_new();
    const worksheet = utils.aoa_to_sheet([header, ...data], config);
    // utils.sheet_add_aoa(worksheet, [header, ...data], config);
    
    utils.book_append_sheet(workbook, worksheet, 'Beneficiarios');

    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcel(excelBuffer, 'Beneficiarios.xlsx');
  };

  saveAsExcel = (buffer, filename) => {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    return (
      <div>
        <button className='btn btn-success btn-sm' onClick={this.exportToExcel}>A excel</button>
      </div>
    );
  }
}