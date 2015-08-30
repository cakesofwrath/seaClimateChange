import React from "react";
import d3 from "d3";

// import L from "leaflet";
var L = require("leaflet");

L.Icon.Default.imagePath = "../../node_modules/leaflet/src/images";
const southWest = new L.latLng(23.314308, -126.067097),
    northEast = new L.latLng(48.301400, -61.226309),
    bounds = new L.latLngBounds(southWest, northEast);

class Map extends React.Component {
    constructor(props) {
        // console.log(props);
        super(props);
        this.state = {
            map: null,
            data: null
        };
        
    }

    componentDidMount() {
        let map = new L.map("map");
        map.invalidateSize();
        let baseLayer = new L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            id: "cakesofwrath.5eddf8f1",
            accessToken: "pk.eyJ1IjoiY2FrZXNvZndyYXRoIiwiYSI6Ijk5YWI3OTlhMGIxN2I1OWYzYjhlOWJmYjEwNTRjODU0In0._RjYIzLsA5cU-YM6dxGOLQ" 
        });

        baseLayer.addTo(map);
        map.fitBounds(bounds); // maybe redundant?

        let myStyle = {
                "color": "#ff7800",
                "weight": 5,
                "opacity": 0.65
        };
        this.setState({
            map: map
        });
        $.getJSON("../../data/mslTrends.geo.json", (data) => {
            console.log("sorted", data.map((feature) => {
                    return feature.properties["MSL Trends (mm/yr)"]
                }).sort());
            let rScale = d3.scale.quantize()
                .domain(data.map((feature) => {
                    return feature.properties["MSL Trends (mm/yr)"]
                }).sort())
                .range([5, 7, 9, 11, 13, 15, 17, 19, 21]),
            cScale = d3.scale.quantile()
                .domain(data.map((feature) => {
                    return feature.properties["MSL Trends (mm/yr)"]
                }).sort())
                .range(['rgb(239,243,255)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,69,148)'].reverse());
            console.log(rScale(5))
            L.geoJson(data, {
                pointToLayer(feature, latlng)  {
                    if(feature.properties["MSL Trends (mm/yr)"] > 0) {
                        return L.circleMarker(latlng, {
                            radius: rScale(feature.properties["MSL Trends (mm/yr)"]),
                            fillColor: cScale(feature.properties["MSL Trends (mm/yr)"])
                        });
                    }
                    else {

                    }
                },
                onEachFeature(feature, layer) {
                    let p = feature.properties,
                        name = p["Name"],
                        msl = p["MSL Trends (mm/yr)"];
                    layer.bindPopup(`<h5>${name}</h5>
                        <p class="msl">${msl} mm rise in MSL yearly</p>
                    `)
                    // layer.bindPopup(feature.properties.toString());
                }
            }).addTo(map);
            
        });
        
    }


    render() {
        return (
            <div id="map"></div>
        );
    }
}

export default Map;
