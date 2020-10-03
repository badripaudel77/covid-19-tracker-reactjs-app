import React from 'react'
import numeral from 'numeral';
import './Table.css';


export const Table = ({tableData}) => {
    // console.log(tableData)
    const renderTableData = () => {
           return tableData.map((data) => (  
                    <tr key={data.country} className = "table__rows">
                        <td>{(data.country)}</td>
                        <td>{numeral(data.cases).format("0,0")}</td>
                        <td>{numeral(data.recovered).format("0,0")}</td>
                        <td>{numeral(data.deaths).format("0,0")}</td>
                    </tr> 
            ))
          }
    return (
        <div className="table"> 
             <table border="border">
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Cases</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableData()}  
                    </tbody>
            </table>        
        </div>
    )
}


