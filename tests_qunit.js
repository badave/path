test("A Path object should ", function() {
  var path = new Path();
  ok( path instanceof Array, "inherit from Array" );
  ok( path instanceof Path, "inherit from Path" );
});