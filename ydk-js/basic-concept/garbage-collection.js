//
var bigData = [];

function process(bigData) {
}

process(bigData);
// bigData now is garbage collection.


// to reclaim bigData memory wrap bigDat and process fnc in block scope
{
    var bigData = [];

    function process(bigData) {
    }

    process(bigData);
}

// all inside in above block will go away after.
