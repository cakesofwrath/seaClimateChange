var webpack = require("webpack");

module.exports = {
    entry: "./react/index.js",
    output: {
        path: "./build",
        filename: "bundle.js"
    },
    module: {
        loaders: [ 
            { 
                test:/\.jsx$|\.js/, 
                exclude: /(node_modules)/,
                loader: "babel" 
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    }
};
