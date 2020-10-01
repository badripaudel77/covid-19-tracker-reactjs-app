import React from 'react'

import './Table.css';

export const Table = ({tableData}) => {
    // console.log(tableData)
    const renderTableData = () => {
           return tableData.map((data) => (  
                    <tr key={data.country} className = "table__rows">
                        <td>{data.country}</td>
                        <td>{data.cases}</td>
                        <td>{data.recovered}</td>
                        <td>{data.deaths}</td>
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


