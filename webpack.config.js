var webpack = require('webpack');

var config = {
    //proxy to the backend server so you can run the full build for backend with npn run build
    //but hot reload the frontent stuff using npn run dev
    devServer: {
        proxy: {
            '*': {
                target: 'http://localhost:41800',
                secure: false,
            },
        },
    },
};

module.exports = config;
