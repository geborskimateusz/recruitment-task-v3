
function http() {
    const queryAsArray = queryParam => queryParam instanceof Array ? [...queryParam] : [queryParam];

    return { queryAsArray }
}

module.exports = http;