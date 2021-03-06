import React from "react";

var Map = require("./components/Map"),
    Chart = require("./components/Chart"),
    Table = require("./components/Table"),
    PieText = require("./components/PieText");

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
        this._onTransition = this._onTransition.bind(this);

        let graphOne, graphTwo, table;
        this.state = {
            graph: null,
            table: null,
            transitions: [false, false, false, false],
            graphInfo: (
                <div id="graphInfo" className="column_8 offset_2 radius bck color text center">
                    <h3>As of July 2015, global sea levels have risen over 65 millimeters against the mean.</h3>
                    <p>So about... <span id="mmDisplay">this much.</span></p> <p id="infoP">That might not look like a lot, but even slight inreases can lead 
                    to huge consequences</p>
                    <a id="transitionOne" className="button large icon arrow-down transition" onClick={this._onTransition}></a>
                </div>
            ),
            status: 0
        }
        $.getJSON("data/gmsl.json", (data) => {
            let gmsl = {
                bindto: "#graph",
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
                size: {
                    height: 420
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
                // let zosgaRaw = data;
                let zosga = {
                    bindto: "#graph",
                    data: {
                        json: data,
                        keys: {
                            x: "yr",
                            value: ["Projected Global Average Sea Level Change (mm)"]
                        },
                        type: "area-spline"
                    },
                    color: {
                        pattern: ["#6699FF"]
                    },
                    size: {
                        height: 420
                    },
                    unload: ["Global Mean Sea Level Change (mm)"]
                };

                    let graph = [gmsl, zosga];
                    console.log(graphTwo)
                    $.getJSON("data/cityElevations.json", (data) => {
                        table = data;
                        this.setState({
                            data: {
                                graph,
                                table
                            }
                        });
                    })
                    
                
                
            });
        });
    }

    componentDidMount() {
        $('html, body').animate({
            scrollTop: $("#header").offset().top
        }, 1000);
    }

    _onTransition(e) {
        if(this.state.status < 4) {
            let tr = this.state.transitions;
            tr[this.state.status] = true;
            this.setState({
                status: this.state.status + 1,
                transitions: tr
            }, () => {
                console.log("_ontransition state", this.state);
                switch(this.state.status) {
                    case 1: 
                        $("#graphInfo").fadeOut(1000, () => {
                            $('html, body').animate({
                                scrollTop: $("#header").offset().top
                            }, 1000);
                            this.setState({
                                graphInfo: (
                                    <div id="graphInfo" className="column_8 offset_2 radius bck color text center hidden">
                                        <h3>Aaaand it's not getting any better.</h3>
                                        <p>Show above is the CMIP5 model from the World Climate Research Program<i>me</i>. 
                                        It projects even further rises in global sea level in the upcoming century, which will not only strand many a polar bear, but also sully
                                        freshwater resources, thereby interfering with irrigation for agriculture and natural freshwater habitats, cause droughts in areas that rely on 
                                        the spring runoff of now non-existent or diminished glaciers and ice sheets, and, conversely, also cause <b>major flooding</b>
                                        .</p> <a id="transitionTwo" className="button large icon arrow-down transition" onClick={this._onTransition}></a>
                                    </div>
                                )
                            });
                            $("#graphInfo").fadeIn(700);
                            this.forceUpdate();
                        });
                        
                    break;
                    case 2:
                        $('html, body').animate({
                            scrollTop: $("#tableRow").offset().top
                        }, 1000);
                    break;
                    case 3:
                        $('html, body').animate({
                            scrollTop: $("#mapRow").offset().top
                        }, 1000);
                    break;
                }
            });

        }
        else { // last one
            // reenable scroll, links? idk
            $('html, body').animate({
                scrollTop: $("#header").offset().top
            }, 1000);
        }
    }

    _showButton() {
        $("#transitionThree").removeClass("hidden");
    }

    render() {
        // "<Chart id="slGraph" data={this.state.data} />"
        // console.log("render", this.state);
        if(this.state)
        return (
            <div>
                <header id="header" className="bck light padding">
                    <div className="row title">
                        <div className="column_6">
                            <h2>Climate Change: Sea it Happen</h2>
                        </div>
                        <nav className="column_6 text right bold">
                            <button data-tuktuk-modal="default_modal" id="about">About</button>
                            <a href="https://github.com/cakesofwrath/seaClimateChange" className="button small bck">Github</a>
                        </nav>
                    </div>
                </header>
                <div className="row graphRow" id="graphRow">
                    <div className="column_12">
                        <Chart id="graph" transition={this.state.transitions[0]} data={this.state.data && this.state.data["graph"] ? this.state.data["graph"] : null} />
                    </div>
                </div>
                <div className="row margin-bottom graphInfoRow" id="graphInfoRow">
                    {this.state.graphInfo}  
                </div>
                <div className="row margin-bottom tableRow" id="tableRow">
                    <PieText showButton={this._showButton} transition={this.state.transitions[1]} />
                    <div className="column_6">
                        <h4>Coastal Cities at Risk</h4>
                        <Table data={this.state.data && this.state.data["table"] ? this.state.data["table"] : null} />
                        <a id="transitionThree" className="button large icon arrow-down hidden transition" onClick={this._onTransition}></a>
                    </div>
                </div>
                <div className="row margin-top mapRow" id="mapRow">
                    <div className="column_12">
                        <Map />
                    </div>
                </div>
                <div className="row mapInfo" id="mapInfo">
                    <div className="column_8 offset_2 radius bck color text center">
                        <h3>Of course, rise in sea levels isn't regular - varying coasts experience varying changes.</h3>
                        <p>Here, sea level trends (from <a href="http://tidesandcurrents.noaa.gov/sltrends/sltrends.html">NOAA data</a>) are 
                        plotted - larger circles correlate to a greater rise in sea level. Many of the largest circles you see may be underwater in a few decades.
                        <br/></p>
                    </div>
                </div>
                <div className="row whatMeDo" id="whatMeDo">
                    <h3>So what can I do about climate change?</h3>
                    <div className="column_6">
                        <h5>Learn and Educate</h5>
                        <ul>
                            <li>Do some <a href="http://lmgtfy.com/?q=Global+Warming">research.</a></li>
                            <li>Learn your <a href="http://www.nature.org/greenliving/carboncalculator/">carbon footprint.</a></li>
                            <li>Know why climate change happens, and why the fact that it's snowing today has nothing to do with the climate.</li>
                            <li>Teach your friends. And trust in the power of scientific consensus.</li>
                        </ul>
                    </div>
                    <div className="column_6">
                        <h5>Act and Advocate</h5>
                        <ul>
                            <li>Contact your local Congressman/woman and Senator and ask for their position on climate change and what should bd done about it.</li>
                            <li>Consider installing solar panels on your roof, or getting a powerful, yet stylish electric car, like the all new 2016 Nissan Volt.</li>
                            
                            <li>Don't let any elected official do this: <img src="https://38.media.tumblr.com/d79285f10e58985aa265d4ce61dea092/tumblr_nkfqkgRWJr1qfvu36o1_500.gif" /></li>
                        </ul>
                    </div>
                </div>
                <center><a id="transitionThree" className="button large icon arrow-up transition" onClick={this._onTransition}></a></center>
                <div id="default_modal" data-tuktuk="modal" className="column_5">
                    <header>
                        <h4 className="text thin">About</h4>
                    </header>
                    <article>
                        The first two datasets are, respectively, from the 
                        <a href="http://climate.nasa.gov/system/internal_resources/details/original/121_Global_Sea_Level_Data_File.txt">NASA Goddard Space Flight Center's MEaSUREs program</a> 
                        <a href="http://cmip-pcmdi.llnl.gov/cmip5/data_description.html">and the CMIP5 models from the WCRP</a>. 
                        The cities data is from NASA satellite image estimation and *cough* Google and the pie chart sources are listed in the source code.
                        Finally, the sea level trend data is from <a href="http://tidesandcurrents.noaa.gov/sltrends/sltrends.html">NOAA's Center for Operational Oceanographic Products and Services.</a>

                        Check out the <a href="https://github.com/cakesofwrath/seaClimateChange">code here</a>.
                    </article>
                    <footer>
                        <button data-modal="close" className="anchor"><span className="icon remove"></span>Close</button>
                    </footer>
                </div>
            </div>
        );
    }
}

export default App;
