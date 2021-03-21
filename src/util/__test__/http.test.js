const { paramAsArray, containsParams } = require('../http');

it('should always returns array of parameters', async () => {
    let parameters = ['a', 'b'];
    let actual = paramAsArray(parameters);
    expect(actual instanceof Array).toBe(true);

    parameters = 'a';
    actual = paramAsArray(parameters);
    expect(actual instanceof Array).toBe(true);
});

it('verify that parameters exist', async () => {
    let parameters = {};
    let actual = containsParams(parameters);
    expect(actual).toBe(false);

    parameters = { a: 'a' };
    actual = containsParams(parameters);
    expect(actual).toBe(true);
});


