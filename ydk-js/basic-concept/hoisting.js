(function () {
    console.log(a);
    var a = 10;
})(); // =>> undefined


(function () {
    var foo = true;

    function bar() {
        if (foo) {
            var foo = 100;
        }
        console.log(foo);
    }

    bar();
})(); // =>> undefined;

/**
 * var foo;
 * var bar;
 * execute bar;
 *      var bar-foo;
 *      execute if statement with bat-foo not foo
 *      execute console.log(foo) ==> undefined
 **/



(function () {
    var foo = true;

    function bar() {
        if (foo) {
            foo = 100;
        }
        console.log(foo);
    }

    bar();
})(); // =>> 100;

/**
 * var foo;
 * var bar;
 * execute bar;
 *      execute if statement with foo
 *      foo = 100;
 *      execute console.log(foo) ==> 100
 **/
