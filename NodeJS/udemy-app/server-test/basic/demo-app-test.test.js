const request = require('supertest');
const expect = require('expect');

let requestLocalHost = request('http://localhost:1198');

describe('demo express app test', function () {
    it('GET/users', (done) => {
        requestLocalHost.get('/user').expect(200).expect((res) => {
            expect(res.body).toMatchObject({
                name: 'diepledev'
            });
            expect(res.body.majors).toContain('JS');
            expect(res.body.majors).not.toContain('JAVA');
        }).end(done);
    });
});
