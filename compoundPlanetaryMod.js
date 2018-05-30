var ratioFunction = "";
var toRad = Math.PI/180
var checked = 0
var next = 0

function assert(condition) {
	if (!condition) {throw "assertion failed"}
}

self.onmessage = function (msg) {
	next = 10000
	min = msg.data[8]
	max = msg.data[9]
	for (var s = parseInt(msg.data[0]); s <= parseInt(msg.data[1]); s++) {
	for (var p = parseInt(msg.data[2]); p <= parseInt(msg.data[3]); p++) {
	for (var r = parseInt(msg.data[4]); r <= parseInt(msg.data[5]); r++) {
	for (var s2 = parseInt(msg.data[0]); s2 <= parseInt(msg.data[1]); s2++) {
	for (var p2 = parseInt(msg.data[2]); p2 <= parseInt(msg.data[3]); p2++) {
	for (var r2 = parseInt(msg.data[4]); r2 <= parseInt(msg.data[5]); r2++) {
	for (var pn = parseInt(msg.data[6]); pn <= parseInt(msg.data[7]); pn++) {
		
		try {
			//basic planetary gear constraint
			assert(r == 2 * p + s);
			assert(r2 == 2 * p2 + s2);
			//constraint for evenly spaced planets
			assert((s + r) % pn == 0);
			assert((s2 + r2) % pn == 0);
			//planets must be the same distance from the orgin axis
			moduleMultiplier = (s + p) / (s2 + p2)
			assert(min <= moduleMultiplier && moduleMultiplier <= max)
			//planets cannot intersect
			var dist = s/2 + p/2;
			assert(p+2 < Math.sqrt((dist * Math.sin(360 / pn * toRad))**2 + (dist - dist * Math.cos(360 / pn * toRad))**2));
			var dist = s2/2 + p2/2;
			assert(p2+2 < Math.sqrt((dist * Math.sin(360 / pn * toRad))**2 + (dist - dist * Math.cos(360 / pn * toRad))**2));
			//modules cannot be the same
			assert(!(r == r2 && p == p2 && s == s2))

			self.postMessage([0,s,p,r,s2,p2,r2,pn,moduleMultiplier]);
		} catch (a) {
			if (a != "assertion failed") {throw a}
		}

		checked++;
		if (checked >= next) {
			self.postMessage([1, checked]);
			next += 10000;
		}

	}}}}}}}
	self.postMessage([2]);
}