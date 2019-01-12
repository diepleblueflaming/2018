"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 17/06/2018 - 09:51
 */
const expect = require('expect');
const request = require('supertest');
const baseUrl = 'http://localhost:1198';

module.exports = function (parent) {
    it('should test login module', function (done) {
        const loginUrl = `${baseUrl}/user/login`;
        const userInfo = {
            email: 'jane@gmail.com',
            password: '123456'
        };
        request(loginUrl).post('/').send(userInfo).expect(200).expect((res) => {
            parent.tokens = res.headers['x-auth'];
        }).end((err, res) => {
            done(err || undefined)
        });
    });
};
