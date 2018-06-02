// problem
(function () {
    for (var i = 0; i <= 5; i++) {
        setTimeout(function timer() {
            console.log(i);
        }, i * 1000);
    }
});
// output: 6 print out 5 times.

/**
 * Reason:
 *     1. In ra 6 5 lần là do:
 *      - Các hàm callback được đẩy vào callback queue chỉ chạy sau khi
 *        for statement chạy xong hoàn toàn ==> lúc này i có giá trị 6.
 *      - Tại thời điểm tạo ra các hàm callback( hàm closure timer())
 *        thì đều refer tới global scope(vì vòng for không có scope). ==> theo như closure thì khi chạy các hàm callback
 *        sẽ refer tới i( for scope lúc này = 6).
 */


/**
 * To solve:
 *  ===> Tạo cho mỗi hàm callback một scope (chứa một giá trị i ) để khi thực hiện chạy các hàm callback
 *  sẽ refer tới scope của riêng nó để lấy i.
 **/
(function () {
    for (var i = 1; i <= 5; i++) {
        (function (i) {
            setTimeout(function timer() {
                console.log(i);
            }, i * 1000);
        })(i);
    }
});

/**
 * use let to solve
 * each iterator let initial i value for each block scope
 */

for (let i = 0; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}
