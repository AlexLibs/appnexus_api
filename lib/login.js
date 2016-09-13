"use strict";
const axios = require('axios');

const url = 'https://api.appnexus.com/auth';

function getToken(seat) {
    const data = {auth: {username: seat.userName, password: seat.password}};
    const axiosOpts = {
        method: 'POST', headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        params: {},
        data
    };
    const body = data;

    return axios(url, axiosOpts, body)
        .then(function requestSuccess(res) {
            return res.data.response.token;
        });
}

module.exports = {
    getToken
};