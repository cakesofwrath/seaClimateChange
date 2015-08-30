import React from "react";
import c3 from "c3";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.data && nextProps.data) {
            
            this.state.chart = c3.generate(nextProps.data);

        }
        /*else if(nextProps.data) {
            // flow in data
            this.state.chart.flow(nextProps.data);
        }*/
    }

    render() {
        return (
            <div id={this.props.id}></div>
        );
    }
}

Chart.defaultProps = { data: null }

export default Chart;
