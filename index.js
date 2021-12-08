const well_known = "https://accounts.google.com/.well-known/openid-configuration";
//const well_known = "https://api.weixin.qq.com/sns/oauth2/access_token"
const authorization_endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const token_endpoint = 'https://oauth2.googleapis.com/token';
const userinfo_endpoint = 'https://openidconnect.googleapis.com/v1/userinfo';

const client_id = '584220930515-742jon2tvv8d8ouj040dpob2b6b0g8kg.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uri = 'http://www.example.com/oidc/token';

const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const serve = require('koa-static');
const axios = require('axios');

const app = new Koa();
const router = new Router();

const main = serve(path.join(__dirname + '/public'));

async function endpoints() {
    console.log('>>> Well known endpoints:\n', `${well_known}`);
    const res = await axios({
        method: 'get',
        url: `${well_known}`,
        headers: {
            accept: 'application/json'
        }
    });
    console.log("<<< Well known endpoints:", res.data);
};

const oauth = async ctx => {

    //endpoints();

    console.log('>>> Exchange code for access token and ID token:\n', ctx.request);
    const code = ctx.request.query.code;
    console.log('authorization code:', code);

    const tokenResponse = await axios({
        method: 'post',
        url: `${token_endpoint}?` + 
        `code=${code}&` +
        `client_id=${client_id}&` +
        `client_secret=${client_secret}&` +
        `redirect_uri=${redirect_uri}&` +
        `grant_type=authorization_code`,
        headers: {
            accept: 'application/x-www-form-urlencoded'
        }
    });

    console.log("<<< Exchange code for access token and ID token, response:\n", tokenResponse.data);
    const token = tokenResponse.data.access_token;
    console.log(`access token: ${token}`);

    console.log('>>> Obtaining user profile information:\n');

    const userinfo = await axios({
        method: 'get',
        url: `${userinfo_endpoint}`,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
  
    console.log("<<< Obtaining user profile information:\n", userinfo.data);

    code2 = encodeURIComponent(code);
    token2 = encodeURIComponent(token);
    user2 = encodeURIComponent(JSON.stringify(userinfo.data, null, 4));
    ctx.response.redirect(`/welcome.html?code=${code2}&token=${token2}&user=${user2}`);
};

router.get('/oidc/token', oauth);

app.use(main);
app.use(router.routes());

app.listen(80);
console.log("listen on :80 ...");
