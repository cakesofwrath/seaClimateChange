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
                bindto: "#seaChart",
                data: {
                    json: data,
                    keys: {
                        x: "yr",
                        value: ["Sea Level Change (mm)"]
                    },
                },
                axis: {
                    x: {
                        tick: {
                            values: range(1993, 2017)
                        }
                    }
                }
            };
            $.getJSON("data/zosgaSummed.json", (data) => {
                zosga = {
                    bindto: "#seaChart",
                    data: {
                        json: data,
                        keys: {
                            x: "yr",
                            value: ["zosgaSummed"]
                        }
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
                <div className="row margin-bottom graph">
                    <div className="column_12">
                        <Chart id="slGraph" type={this.state.graphType} data={this.state.data ? this.state.data[this.state.graphType] : null} />
                    </div>
                </div>
                <div className="row map">
                    <div className="column_12">
                        <Map id="map" />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
