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
            if(nextProps.data.length === 2) {
                this.state.chart = c3.generate(nextProps.data[0]);
                /*setTimeout(() => {
                    this.state.chart.unload({
                        ids: ["Global Mean Sea Level Change (mm)"],
                        done() {
                            thisState.chart = c3.generate(nextProps.data[0]); // hack cuz nothing else worked            
                        }
                    })
                    
                }, this.props.tOut)*/
            }
            else {
                this.state.chart = c3.generate(nextProps.data);
            }
        }
    }



    render() {
        if(this.props.transition && this.props.transition ===1 && this.props.data.length === 2) {
            let thisState = this.state, dat = this.props.data;
            this.state.chart.unload({
                ids: ["Global Mean Sea Level Change (mm)"],
                done() {
                    thisState.chart = c3.generate(dat[1]); // hack cuz nothing else worked            
                }
            });
        }
        return (
            <div id={this.props.id}></div>
        );
    }
}

Chart.defaultProps = { data: null }

export default Chart;
