
const paramAsArray = queryParam => queryParam instanceof Array ? [...queryParam] : [queryParam];
const containsParams = query => Object.keys(query).length !== 0;

module.exports = { paramAsArray, containsParams }

