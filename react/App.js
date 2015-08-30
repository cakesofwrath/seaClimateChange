import React from "react";

var Map = require("./components/Map"),
    Chart = require("./components/Chart");

let range = (start, end) => {
    let toRet = [];
    for(let i=start; i<end; i++) {
        toRet.push(i);
    }
    return toRet;
}

let leapYear = (year) => {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};

let convertDecimalDate = (decimalDate) => {
    var year = parseInt(decimalDate);
    var reminder = decimalDate - year;
    var daysPerYear = leapYear(year) ? 366 : 365;
    var miliseconds = reminder * daysPerYear * 24 * 60 * 60 * 1000;
    var yearDate = new Date(year, 0, 1);
    return new Date(yearDate.getTime() + miliseconds);
};

class App extends React.Component {
    constructor(props) {
        // stuff
        super(props);
        let gmsl, zosga;
        this.state = {
            gmsl: null,
            zosga: null,
            graphType: "zosga"
        }
        $.getJSON("data/gmsl.json", (data) => {
            gmsl = {
                bindto: "#gmsl",
                data: {
                    json: data,
                    keys: {
                        x: "yr",
                        value: ["Global Mean Sea Level Change (mm)"]
                    },
                    type: "area-spline"
                },
                color: {
                    pattern: ["#6699FF"]
                },
                axis: {
                    x: {
                        tick: {
                            values: range(1993, 2017)
                        }
                    }
                },
                tooltip: {
                    format: {
                        title(d) {
                            let date = convertDecimalDate(d);
                            return (date.getMonth() + 1) + "/" +
                                date.getDate() + "/" + 
                                date.getFullYear();
                        }
                    }
                }
            };
            $.getJSON("data/zosga.json", (data) => {
                zosga = {
                    bindto: "#zosga",
                    data: {
                        json: data,
                        keys: {
                            x: "yr",
                            value: ["Global Mean Sea Level Change (mm)"]
                        },

                    },
                    color: {
                        pattern: ["#6699FF"]
                    }
                };
                this.setState({
                    data: {
                        gmsl,
                        zosga
                    }
                });
            });
        });
    }

    render() {
        // "<Chart id="slGraph" data={this.state.data} />"
        console.log(this.state);
        return (
            <div>
                <div className="row graph">
                    <div className="column_12">
                        <Chart id="gmsl" type="gmsl" data={this.state.data ? this.state.data["gmsl"] : null} />
                    </div>
                </div>
                <div className="row graph">
                    <div className="column_12">
                        <Chart id="zosga" type="zosga" data={this.state.data ? this.state.data["zosga"] : null} />
                    </div>
                </div>
                <div className="row map">
                    <div className="column_12">
                        <Map />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
