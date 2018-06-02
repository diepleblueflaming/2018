"use strict";

/**
 * Hàm closures có thể truy cập tới biến số của hàm chứa nó, dù cho hàm đó đã return
 *
 */

(function () {
    let callApi = function () {
        let x = 0;
        setTimeout(function () {
            x = 20;
        }, 1000);
        return function (y) {
            return x + y;
        };
    };

    let a = callApi();
    console.log(a(10));
});


/**
 * Hàm closures lưu trữ biến số của outer function theo kiểu tham chiếu
 * module
 */

(function () {
    function student() {
        var _id = 10;
        return {
            getId: function () {
                return _id;
            },
            setId: function (id) {
                _id = id
            }
        };
    }

    var std1 = student();
    console.log(std1.getId());
    std1.setId(23);
    console.log(std1.getId());
});

(function () {
    var std = (function student(name) {
        function changeName() {
            name = name.toUpperCase();
        }

        function getName() {
            console.log(name);
        }

        return {
            changeName,
            getName
        }
    })("diep le");

    std.getName();
    std.changeName();
    std.getName();
})();

