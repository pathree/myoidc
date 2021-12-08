const axios = require('axios');

//const well_known = "https://accounts.google.com/.well-known/openid-configuration";
//const well_known = "https://accounts.google.com/o/oauth2/v2/auth";
const well_known = "https://www.sina.com";
//const well_known = "http://localhost:80"
//const well_known = "https://api.weixin.qq.com/sns/oauth2/access_token";

console.log('>>> Well known endpoints:\n', `${well_known}`);

    /*const endpoints = axios({
        method: 'get',
        url: `${well_known}`,
        headers: {
            accept: 'application/json'
        }
    });*/

    axios.get(well_known).then(response => {console.log(response.data)});

//console.log("<<< Well known endpoints:\n", endpoints.data);

