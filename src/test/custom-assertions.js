const assertErrorMessage = (actual, message) => {
    const expected = { errors: [{ message }] };
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
}

const assertGenres = (expected, actual) => {
    const found = actual.some(r => expected.includes(r))
    expect(found).toBeTruthy();
}

const assertRuntime = runtime => {
    const lowerRange = 110;
    const higherRange = 130;
    runtime = parseInt(runtime);
    expect(runtime).toBeGreaterThanOrEqual(lowerRange);
    expect(runtime).toBeLessThanOrEqual(higherRange);
}
module.exports = { assertErrorMessage, assertGenres, assertRuntime }