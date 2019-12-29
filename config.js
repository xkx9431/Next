const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

const client_id = 'c601e6ac7ee49a84ceed'


module.exports = {
    github:{
        request_token_url: 'https://github.com/login/oauth/access_token',
        client_id,
        client_secret:"15f46b832f77f472045302f99e8a980a3aa63c49"
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
}
