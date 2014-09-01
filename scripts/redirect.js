var url = document.URL;
var parameter = '?softblocked=';

var index = url.lastIndexOf(parameter);
var url = url.substr(index + parameter.length);

