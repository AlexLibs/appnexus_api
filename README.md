# appnexus_api

> appnexus_api module is just a layer between your application and appnexus API (https://wiki.appnexus.com/display/documentation/API+Documentation) that takes care of retrieving, caching and refreshing the token so you can concentrate on the logic of your application.

## Install:

        $ npm i appnexus_api --save

## Initialize:
In your code initialize it at least once before the usage (for example in your server.js):

        require('appnexus_api').init(appnexusSeats);

While appnexusSeats can be defined for example in your config.js file:

        const appnexusSeats = [
            {name: 'Appnexus_subSeat1', userName: 'Appnexus_subSeat1_userName1', password: 'Appnexus_subSeat1_password1'},
            {name: 'Appnexus_subSeat2', userName: 'Appnexus_subSeat1_userName1', password: 'Appnexus_subSeat1_password1'},
            {name: 'Appnexus_subSeat3', userName: 'Appnexus_subSeat1_userName1', password: 'Appnexus_subSeat1_password1'}
        ];

## Usage:
In each module that uses Appnexus API, require it:
        const apiRequest = require('appnexus_api');

Then just call apiRequest method with the params and the appnexus_api module will take care of managing (retieving, caching and refreshing) the token :)

## Examples:
_Check the API documentation for all possible calls and parameters:_
https://wiki.appnexus.com/display/documentation/API+Documentation (e.g. for campaingns API: https://wiki.appnexus.com/display/api/Campaign+Service)

1. Retrieve campaingns:

        return apiRequest(appnexusSeatName, `https://api.appnexus.com/campaign?search=Mobile&start_element=0&num_elements=10`)
            .then((res) => ...your code here...);

2. Update campaigns:   

        apiRequest(appnexusSeatName, url, body, 'PUT')
            .then((res) => ...your code here...);
