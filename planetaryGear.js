var ratioFunction = "";
var toRad = Math.PI/180
var checked = 0
var next = 0

function assert(condition) {
	if (!condition) {throw "assertion failed"}
}

self.onmessage = function (msg) {
	next = 10000
	for (var s = parseInt(msg.data[0]); s <= parseInt(msg.data[1]); s++) {
	for (var p = parseInt(msg.data[2]); p <= parseInt(msg.data[3]); p++) {
	for (var r = parseInt(msg.data[4]); r <= parseInt(msg.data[5]); r++) {
	for (var pn = parseInt(msg.data[6]); pn <= parseInt(msg.data[7]); pn++) {
		
		try {
			//basic planetary gear constraint
			assert(r == 2 * p + s);
			//constraint for evenly spaced planets
			assert((s + r) % pn == 0);
			//planets cannot intersect
			var dist = s/2 + p/2;
			assert(p+2 < Math.sqrt((dist * Math.sin(360 / pn * toRad))**2 + (dist - dist * Math.cos(360 / pn * toRad))**2));
			self.postMessage([0,s,p,r,pn]);
		} catch (a) {
			if (a != "assertion failed") {throw a}
		}

		checked++;
		if (checked >= next) {
			self.postMessage([1, checked]);
			next += 10000;
		}

	}}}}
	self.postMessage([2]);
}