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
