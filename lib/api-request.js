"use strict";
const axios = require('axios');
const login = require('./login');

let token = {};
let seats;

function tryApiCall(seatPlatform, url, body, method) {
    const axiosParams = {
        method,
        url,
        data: body,
        headers: {Authorization: token[seatPlatform], Accept: 'application/json'}
    };
    return axios(axiosParams);
}

function loginAndTryApi(seatPlatform, url, body, method) {
    const seat = seats.find((seat) => seat.name === seatPlatform);
    return login.getToken(seat)
        .then((_token) => {
            token[seatPlatform] = _token;
            return tryApiCall(seatPlatform, url, body, method);
        });
}

function tryApiCallAndGetTokenBeforeRetry(seatPlatform, url, body, method) {
    return tryApiCall(seatPlatform, url, body, method)
        .catch(() => {
            return loginAndTryApi(seatPlatform, url, body);
        })
}

function apiRequest(seatPlatform, url, body, method) {
    if (token[seatPlatform]) {
        return tryApiCallAndGetTokenBeforeRetry(seatPlatform, url, body, method);
    }
    return loginAndTryApi(seatPlatform, url, body, method);
}

apiRequest.init = function(_seats) {
    seats = _seats;
};

module.exports = apiRequest;
