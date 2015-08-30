import React from "react";
// import L from "leaflet";
var L = require("leaflet");

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
        let map = new L.map(this.props.id, {
            maxBounds: bounds,
            maxZoom: 10,
            minZoom: 5
        });
        let baseLayer = new L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            id: "cakesofwrath.5eddf8f1",
            accessToken: "pk.eyJ1IjoiY2FrZXNvZndyYXRoIiwiYSI6Ijk5YWI3OTlhMGIxN2I1OWYzYjhlOWJmYjEwNTRjODU0In0._RjYIzLsA5cU-YM6dxGOLQ" 
        });
        baseLayer.addTo(map);
        map.fitBounds(bounds); // maybe redundant?
        this.setState({
            map
        });
    }


    render() {
        return (
            <div id={this.props.id}></div>
        );
    }
}

export default Map;
