module("inheritance")

test("A path object should ", function() {
  var path = new Path();
  ok( path instanceof Array, "inherit from Array" );
  ok( path instanceof Path, "inherit from Path" );
});

test("A path object should ", function() {
  var path = new Path();
  ok( 'clone' in path, "have a clone method" );
  ok( 'map' in path, "have a map method" );
  ok( 'filter' in path, "have a filter method" );
  ok( 'slice' in path, "have a slice method" );
});

test("A path object initalized with no data should ", function() {
  var path = new Path();
  ok( path.length == 0, "have no coordinates")
});

module('coordinates')

test("A path object initalized with no coordinates should ", function() {
  var path = new Path([])
  ok( path.length == 0, "have no coordinates")
});

test("A path object initalized with coordinates should ", function() {
  var coords = [[0, 1]];
  var path = new Path(coords);
  ok( path[0] == coords[0], "have those coordinates" );
  ok( path.length == 1, "have one pair of coordinates");

  var coords = [];
  for(var i = 0; i < 5; i++) {
    coords.push([i, i]);
  }
  var path = new Path(coords);

  for(var i = 0; i < coords.length; i++) 
    ok( path[i] == coords[i], "have any arbitrary number of coordinates")

  ok(path.length == coords.length, "have an equal number of arbitrary coordinates")
});

module("SVG")

test("A path object initialized with an empty string should ", function() {
  var path = new Path("");
  ok(path.length == 0, "have no coordinates")
})

test("A path object initialized with an empty string should ", function() {
  var path = new Path("");
  ok(path.length == 0, "have no coordinates")
})

test("A path with a moveto 100 100 should", function() {
  var path = new Path("M 100 100");
  deepEqual(path[0], [100, 100], "should have initial coordinates at 100, 100"); // these arrays are not equal with equal data
  ok(path.length == 1, "have one set of coordinates");
})

test("A path with a moveto 100 100 and a relative lineto 100 100", function() {
  var path = new Path("M 100 100 l 200 200");
  deepEqual(path[0], [100, 100], "should have initial coordinates at 100, 100");
  deepEqual(path[1], [300, 300], "should have [1] coordinates at 200, 200");
  ok(path.length == 2);
});

test("A path with a moveto 100 100 and a relative lineto 100 100, an absolute lineto 200, 300 that's closed", function() {
  var path = new Path("M 100 100 l 200 200 L 200 300 z");
  deepEqual(path[0], [100, 100], "should have initial coordinates at 100, 100");
  deepEqual(path[1], [300, 300], "should have [1] coordinates at 300, 400");
  deepEqual(path[2], [200, 300], "should have [2] coordinates at 200, 300");
  deepEqual(path[3], [100, 100], "should end back at the first position");
  ok(path.length == 4, "should be 4 coordinates in length");
});

module("methods returned object type")
test("A cloned path should", function() {
  var path = new Path([[1, 2]]).clone();
  deepEqual(path[0], [1, 2], "be a copy");
  ok(path instanceof Path, "be a Path");
});

test("The path map method should", function() {
  var path = new Path([[1, 2]]).map(function(coord) { return coord; })
  deepEqual(path[0], [1, 2], "map a path, behaving like an array");
  ok(path instanceof Path, "be a Path");
})

test("The filter method should", function() {
  var path = new Path([[1, 2], [2, 3]]).filter(function(coord) { return coord[0][0] == 1; })
  deepEqual(path[0], [1, 2], "filter a path, behaving like an array");
  ok(path instanceof Path, "be a Path");
})

test("The slice method should", function() {
  var path = new Path([[1, 2], [2, 3]]).slice(1)
  deepEqual(path[0], [2, 3], "slice a path, behaving like an array");
  ok(path instanceof Path, "be a Path");
})

module("String theory")

test("Should be able to get the prototype in string in SVG form", function() {
  var path = new Path([[1, 2], [2, 3]])
  ok(path.toString() == "M 1 2 L 2 3", "should become an SVG string")
});


test("Should be able to get the prototype in string in SVG form", function() {
  var path = new Path([[1, 2], [2, 3], [4, 5], [1, 2]])
  ok(path.toString() == "M 1 2 L 2 3 L 4 5 Z", "should become an SVG string")
});

