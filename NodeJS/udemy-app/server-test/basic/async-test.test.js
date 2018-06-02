var expect = require("expect");

var asyncAddNumbers = function (a, b, callback) {
    setTimeout(function () {
        callback(a + b);
    }, 1000);
};


var asyncSquareNumber = function (a) {
    return Promise.resolve(a * a);
};

describe("async-test", () => {
    it("should async add two number", (done) => {
        asyncAddNumbers(3, 5, (result) => {
            expect(result).toBe(8);
            // call done callback fnc
            done();
        });
    });


    it("should async square two number", (done) => {
        var r = asyncSquareNumber(3);
        done();
        expect(r).toBe(9);
    });
});
