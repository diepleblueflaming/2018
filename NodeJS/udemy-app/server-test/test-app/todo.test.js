"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 04/06/2018 - 15:04
 */
const expect = require('expect');
const request = require('supertest');
const ToDoUrl = 'http://localhost:1198/todo';

(function getAll(lengthOfToDo = 2) {
    describe('GET /todo', () => {
        it('should test number of todo is 1', (done) => {
            request(ToDoUrl).
            get('/').
            expect(200).
            expect((res) => {
                expect(res.body.length).toBe(lengthOfToDo);
            }).
            end((err, res) => {
                done(err || undefined);
            });
        });
    });
})();

describe('POST /todo',() => {
    it('should test add new todo', () => {
       let todo = {
          title: 'new todo title',
          priority: 2
       };
       request(ToDoUrl).
           post('/').
           send(todo).
           expect(200).
           expect((res) => expect(res.title).toBe(todo.title)).
           end((err, res) => {done(err || undefined)});
    });
});

describe('DELETE /')
