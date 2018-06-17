"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 15:04
 */
const expect = require('expect');
const request = require('supertest');
const ToDoUrl = 'http://localhost:1198/todo';

module.exports = function () {
    describe('GET /todo', function () {
        it('should test number of todo is 5', (done) => {
            request(ToDoUrl).get('/').set('x-auth', this.parent.parent.suites[0].tokens).
            expect(200).
            expect((res) => {
                expect(res.body.length).toBe(5);
            }).end((err, res) => {
                done(err || undefined);
            });
        });
    });

    describe('POST /todo', function () {
        it('should test add new todo', (done) => {
            let todo = {
                title: 'new todo title',
                priority: 2
            };
            request(ToDoUrl).post('/').set('x-auth', this.parent.parent.suites[0].tokens).send(todo).expect(200).end((err, res) => {
                if (err) done(err);
                let getTodoByNameUrl = `${ToDoUrl}/${todo.title}`;
                request(getTodoByNameUrl).get('/').set('x-auth', this.parent.parent.suites[0].tokens).expect(200).expect((res) => {
                    expect(res.body.title).toBe(todo.title);
                }).end((err, res) => done(err || undefined));
            });
        });
    });

    describe('GET /todo', function () {
        it('should test number of todo is 5', (done) => {
            request(ToDoUrl).get('/').set('x-auth', this.parent.parent.suites[0].tokens).expect(200).expect((res) => {
                expect(res.body.length).toBe(5);
            }).end((err, res) => {
                done(err || undefined);
            });
        });
    });
};
