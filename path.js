Array.prototype.equalTo = function(array) {
  return !(this < array || array < this);
}

var Path = function(data) {
  this.parsePath = function(path) {
    // For more detail, see http://www.w3.org/TR/SVG/paths.html
    // Superfluous white space and separators such as commas can be eliminated (e.g., "M 100 100 L 200 200" 
    // contains unnecessary spaces and could be expressed more compactly as "M100 100L200 200")

    // make white space seperating, replace double spaces caused by this replacement with single spaces
    // and subsequently split this string by spaces
    var path = path.replace(/([mlzMLZ])/g, "$1 ").replace(/  /g, " ").split(" ");

    // start at 0, 0.  
    var x = 0;
    var y = 0;
    var length = path.length;

    for(var i = 0; i < length; i++) {
      var command = path[i++];

      if(command == "z" || command == "Z") {
        if(this[0][0] && this[0][1]) {
          this.push([this[0][0], this[0][1]]);
        }
        break;
      }

      var new_x = parseInt(path[i++]);
      var new_y = parseInt(path[i]);

      // This is really simplified.
      // 
      if(command == "M" || command == "L") {
        x = new_x;
        y = new_y;
        this.push([x, y]);
      } else if(command == "m" || command == "l") {
        x += new_x;
        y += new_y;
        this.push([x, y]);
      } 
    }
  }

  if(data instanceof Array) {
    // see http://stackoverflow.com/questions/5240335/add-two-arrays-without-using-the-concat-method
    this.push.apply(this, data)
  } else if(typeof data === "string") {
    this.parsePath(data);
  }

}

Path.prototype = Array();

Path.prototype.toString = function() {
  var string = ["M"];
  var clone = this.clone();
  var coords = clone.shift();
  string.push(coords[0], coords[1]);
  while(coords = clone.shift()) {
    if(clone.length == 0 && this[0].equalTo(this[this.length - 1])) {
      string.push("Z");
      break;
    }
    string.push("L");
    string.push(coords[0], coords[1]);
  }

  return string.join(" ");
}

Path.prototype.clone = function() {
  return new Path(this.slice(0));
}

Path.prototype.map = function() {
  return new Path(Array.prototype.slice.apply(this, arguments));
}

Path.prototype.filter = function() {
  return new Path(Array.prototype.slice.apply(this, arguments));
}

Path.prototype.slice = function() {
  return new Path(Array.prototype.slice.apply(this, arguments));
}
