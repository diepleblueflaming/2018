
const myLayers = [{
	path: 'layer',
	handler: [
		{
			previousPath: '',
			path: 'a',
			handler: function (next) {
				console.log('layer1', 'a');
				next();
			}
		},
		{
			previousPath: 'a',
			path: 'b',
			handler: function (next) {
				console.log('layer1', 'b');
				next();
			}
		},
		{
			path: 'sublayer',
			handler: [
				{
					previousPath: 'b',
					path: 'sublayer-a',
					handler: function (next) {
						console.log('-sublayer', 'sublayer-a');
						next();
					}
				},
				{
					path: 'sublayer1',
					handler: [
						{
							previousPath: 'sublayer-a',
							path: 'sublayer1-a',
							handler: function (next) {
								console.log('--sublayer1', 'sublayer1-a');
								next();
							}
						},
						{
							previousPath: 'sublayer1-a',
							path: 'sublayer1-b',
							handler: function (next) {
								console.log('--sublayer1', 'sublayer1-b');
								next();
							}
						},
						{
							previousPath: 'sublayer1-b',
							path: 'sublayer1-c',
							handler: function (next) {
								console.log('--sublayer1', 'sublayer1-c');
								next();
							}
						},
						{
							path: 'sublayer2',
							handler: [
								{
									previousPath: 'sublayer1-c',
									path: 'sublayer2-a',
									handler: function (next) {
										console.log('---sublayer2', 'sublayer2-a');
										next();
									}
								}
							]
						}
					]
				}
			]
		}
	]
}];


// run function version 2
(function run(layers, path){
	return function () {
		const layer = findRunFunction(layers, path);
		const runFnc = layer ? layer.handler : function () {console.log('end !');};

		// update path
		path = layer ? layer.path : '';
		runFnc(run(layers, path));
	}
})(myLayers,'')();


function findRunFunction(layers, path) {
	let result = null;
	let i = 0;
	for(i; i < layers.length; i++) {
		if (layers[i].previousPath === path) {
			return layers[i];
		}
		else if (Array.isArray(layers[i].handler)) {
			result = findRunFunction(layers[i].handler, path);
		}
	}
	return result;
}

function findPreviousFncPath(layers) {
	let result = null;
	let i = 0;
	for(i; i < layers.length; i++) {
		if (typeof layers[i].handler === 'function') {
			result = layers[i];
		}
		else if (Array.isArray(layers[i].handler)) {
			result = findPreviousFncPath(layers[i].handler);
		}
	}
	return result;
}


console.log(findPreviousFncPath(myLayers));


// console.log(findRunFunction(myLayers, 'c'));

// (function run(allLayer, layer, currentIndex) {
// 	return function () {
//
// 		let currentFuntion = null;
// 		// get run function
// 		if (hasSubLayer(layer)) {
// 			// update layer, function will be running
// 			layer = goIntoSublayer(layer);
// 			// if go into other layer, currentIndex always is 0;
// 			currentIndex = 0;
// 		} else {
// 			debugger;
// 			// go out
// 			const {parent, currentPosition} = goOutSublayer(allLayer, layer);
// 			layer = parent;
// 			// currentIndex = currentPosition;
//
//
// 			// // go out if end of layer
// 			// if (layer.handler.length === currentIndex) {
// 			// 	const {parent, currentPosition} = goOutSublayer(allLayer, layer);
// 			// 	layer = parent;
// 			// 	currentIndex = currentPosition;
// 			// }
// 		}
//
// 		let currentFunction = layer.handler;
//
//
// 		// increment current position of control in current layer
// 		currentIndex++;
//
//
// 		/*if (
// 			currentIndex === layer.handler.length - 1 &&
// 			allLayer.path !== layer.path &&
// 			typeof layer.handler[currentIndex].handler === 'function'
// 		) {
// 			const parentLayer = _getParentLayer(allLayer, layer.parentPath);
// 			const myIndex = parentLayer.handler.findIndex(item => item.path === layer.path);
// 			currentHandler = layer.handler[myIndex].handler;
// 			layer = parentLayer;
// 			currentIndex = myIndex + 1;
// 		} else {
// 			if(currentIndex === layer.handler.length && allLayer.path !== layer.path){
// 				return;
// 			}
// 			else if (typeof layer.handler[currentIndex].handler === "function") {
// 				currentHandler = layer.handler[currentIndex].handler;
// 				currentIndex++;
// 			} else if(currentIndex !== layer.handler.length){
// 				layer = layer.handler[currentIndex];
// 				currentHandler = layer.handler[0].handler;
// 				currentIndex = layer.handler.length > 1 ? 1 : 0;
// 			}
// 		}*/
//
// 		currentFunction(run(allLayer, layer, currentIndex));
// 	};
// })(myLayers, myLayers[0], 0)();


function _getParentLayer(allLayer, layer) {
	for (let i = 0; i < allLayer.length; i++) {
		if (allLayer[i].path === layer.parentPath) {
			return allLayer[i];
		}
		else if (allLayer[i].path !== layer.parentPath && Array.isArray(allLayer[i].handler)) {
			return _getParentLayer(allLayer[i].handler, layer);
		}
	}
	return {};
}

function goIntoSublayer(layer) {
	if (hasSubLayer(layer.handler[0])) {
		return goIntoSublayer[layer.handler[0]];
	}
	return layer.handler[0];
}


function goOutSublayer(allLayer, layer) {
	const parent = _getParentLayer(allLayer, layer);
	// if can't not find parent
	if (isEmptyObject(parent)) {
		return {};
	}
	// const superParent = _getParentLayer(allLayer, parent);
	// // if can't find super parent
	// if (isEmptyObject(superParent)) {
	// 	return {};
	// }
	const currentParentPos = parent.handler.indexOf(layer);
	// if layer is end of parent
	if (currentParentPos === (parent.handler.length - 1)) {
		return goOutSublayer(allLayer, parent);
	}
	// else
	const nextHandler = parent.handler[currentParentPos + 1];
	return {
		currentPosition: currentParentPos + 1,
		parent: nextHandler ? nextHandler : {}
	};
}


console.log(goOutSublayer(myLayers, {parentPath: 'sublayer2'}));

function hasSubLayer(layer) {
	return Array.isArray(layer.handler) && layer.handler.length > 0;
}

function isEmptyObject(object) {
	return Object.keys(object).length <= 0;
}