const withCss = require('@zeit/next-css')
if (typeof require !== "undefined"){
    require.extensions[".css"] = file =>{
        // todo
    }
}

module.exports = withCss({
})