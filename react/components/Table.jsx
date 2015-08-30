import React from "react";
// import d3 from "d3";

class Table extends React.Component {

    render() {
        if(this.props.data) {
            let headers = (
                <tr>
                    <th>City Name</th>
                    <th>Average Elevation (m)</th>
                    <th>Metro Population</th>
                </tr>
            );
            let trs = this.props.data.sort((a, b) => {
                    return a.elevation - b.elevation;
                })
                .map((val, i) => {
                    return (
                        <tr>
                            <td>{val.name}</td>
                            <td>{val.elevation}</td>
                            <td>{val.population}</td>
                        </tr>
                    );
            });
            return (
                <table id="cityTable">
                    <thead>
                        {headers}
                    </thead>
                    <tbody>
                        {trs}
                    </tbody>
                </table>
            );
        } 
        else {
            return null;
        }
    }
}

export default Table;
