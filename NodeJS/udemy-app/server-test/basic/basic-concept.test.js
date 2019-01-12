const expect = require("expect");

let a = 10,
    b = {name: 'dieple'},
    c = [1, 5, 7, 9];

it('it should add two number', function () {
    expect(a).toBe(10);
});

it('should compare two object', function () {
    expect(b).toEqual({name: 'dieple'});
});

it('should check if array contain an number', function () {
    expect(c).toContain(5);
});

it('should check if array not contain an number', function () {
    expect(c).not.toContain(10);
});

it('should check if object have a subset object', function () {
    expect({
        name: 'dieple',
        age: 10,
        add: 'Ha Noi'
    }).toMatchObject({
        age: 10
    });
});

it('should check if object don\'t have a subset object', function () {
    expect({
        name: 'dieple',
        age: 10,
        add: 'Ha Noi'
    }).not.toMatchObject({
        age: 15
    });
});

it('should expect an object have a property', () =>
    expect({
        name: 'dieple',
        address: 'Ha Noi'
    }).toHaveProperty('address')
);

it('should expect an object don\'t have a property', () =>
    expect({
        name: 'dieple',
        address: 'Ha Noi'
    }).not.toHaveProperty('last_name')
);

it('should expect an string match regex/string', function () {
    expect('dieple').toMatch(new RegExp('[a-z]'));
});


it('should expect an  to be falsy [false, \'\', null, undefined, NaN, 0]', () => {
    expect(0).toBeFalsy();
});

it('should expect an  to be Truthy', () => {
    expect(10).toBeTruthy();
});

