
function http() {
    const queryAsArray = queryParam => queryParam instanceof Array ? [...queryParam] : [queryParam];
    const quertParamExist = query => Object.keys(query).length !== 0;

    return { queryAsArray, quertParamExist }
}

module.exports = http;