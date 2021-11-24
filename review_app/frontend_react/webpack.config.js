// Check conversion to ES6 JS is okay with this (see VSCode quick fix ver.)
module.exports = {
    module: {
        rules: [
            {
                test:   /\.js$/,
                exclude:    /node_modules/,
                use:    {
                    loader: "babel-loader"
                }
            }
        ]
    }
};