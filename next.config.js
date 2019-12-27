const withCss = require('@zeit/next-css')
if (typeof require !== "undefined"){
    require.extensions[".css"] = file =>{
        // todo
    }
}

module.exports = withCss({
    github: {
        request_token_url: 'https://github.com/login/oauth/access_token',
        client_id: '',
        client_secret: '',
    }
})