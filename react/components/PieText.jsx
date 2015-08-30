import React from "react";
import c3 from "c3";

var interval;

const facts = [
    {
        text: "44% of the world lives in a coastal area.",
        data: [
            ["coastal", 44],
            ["land", 56]
        ],
        source: "http://coastalchallenges.com/2010/01/31/un-atlas-60-of-us-live-in-the-coastal-areas/"
    },
    {
        text: "Nearly 70% of megacities (10+ million people) are coastal.",
        data: [
            ["coastal",  16],
            ["land", 7]
        ],
        source: "http://www.igbp.net/news/features/features/coastalmegacitiesrisksandopportunities.5.62dc35801456272b46d17b.html"
    },
    {
        text: "Shoreline counties only comprise 10% of mainland American land.",
        data: [
            ["coastal", 1],
            ["land", 9]
        ],
        source: "http://oceanservice.noaa.gov/facts/population.html"
    },
    {
        text: "Shoreline counties account for nearly 40% of the American population.",
        data: [
            ["coastal", 39],
            ["land", 61]
        ],
        source: "http://oceanservice.noaa.gov/facts/population.html"
    },
    {
        text: "Coastal population density is 6 times greater than inland density in the USA.",
        data: [
            ["coastal", 6],
            ["land", 1]
        ],
        source: "http://oceanservice.noaa.gov/facts/population.html"
    }
]

class PieText extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            chart: null,
            i: 0
        }

    }

    componentDidMount() {
        let pieChart = c3.generate({
            bindto: "#pie",
            data: {
                columns: facts[0].data,
                type: "pie",
                colors: {
                    "land": "#534637",
                    "coastal": "#40a4df"
                }
            },
            pie: {
                label: {
                    show: false
                }
            }
        });
        this.setState({
            chart: pieChart
        });
    }

    componentDidUpdate(prevProps, prevState) {
        
        if(!prevProps.transition && this.props.transition) {
            console.log("transition started");
            interval = setInterval(() => {
                this.state.chart.load({
                    columns: facts[this.state.i].data, // ugly code
                    type: "pie",
                    colors: {
                        "land": "#534637",
                        "coastal": "#40a4df"
                    },
                    unload: ["coastal", "land"]
                });
                if(this.state.i === 4) {
                    
                    clearInterval(interval);
                    interval = null;
                    this.props.showButton();
                    setTimeout(() => {
                        this.setState({
                            i: 0
                        });
                        this.state.chart.load({
                            columns: facts[0].data, // ugly code
                            type: "pie",
                            colors: {
                                "land": "#534637",
                                "coastal": "#40a4df"
                            },
                            unload: ["coastal", "land"]
                        });
                    }, 1500)
                }
                else {
                    
                    this.setState({
                        i: this.state.i + 1
                    });
                }
            }, 4500);
        }
    }

    render() {
        return (
            <div className="column_6">
                <h3>{facts[this.state.i].text}</h3>
                <div id="pie" className="pie"></div>
            </div>
        );
    }
}

export default PieText;
