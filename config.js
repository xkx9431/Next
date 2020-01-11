const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

const client_id = 'c601e6ac7ee49a84ceed'


module.exports = {
    github:{
        request_token_url: 'https://github.com/login/oauth/access_token',
        client_id,
        client_secret:"50c32a778818f2e95e1e764455b0deef48320d1c"
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
}
