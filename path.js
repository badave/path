var Path = function(data) {
  this.parseString = function(string) {
    // For more detail, see http://www.w3.org/TR/SVG/paths.html
    // Superfluous white space and separators such as commas can be eliminated (e.g., "M 100 100 L 200 200" 
    // contains unnecessary spaces and could be expressed more compactly as "M100 100L200 200")
    // Makes it difficult to parse by white space alone.  

    // Specs indicate that moveto must be the first command
    if(string[0] != "M") {
      throw "SVGString needs to begin with an absolute moveto"
    }
  }

  if(data instanceof Array) {
    // see http://stackoverflow.com/questions/5240335/add-two-arrays-without-using-the-concat-method
    this.push.apply(this, data)
  } else if(typeof data === "string") {
    this.parseString(data);
  }

}
Path.prototype = Array()
Path.prototype.clone = function() {

}