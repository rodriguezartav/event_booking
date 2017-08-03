
var url = "http://localhost:3000";
if( process.env.NODE_ENV === "production" ){
  url = "";
}
console.log(url);
console.log(process.env.NODE_ENV);

var Ajax = {}
Ajax.get = function(business,path){
  var headers = new Headers({
    'Content-Type': 'application/json'
  })
  if(business.user && business.user.access_code ) headers.append( 'Authorization',business.user.access_code );

  return fetch(url + path,{
    headers: headers,
    mode: "cors",
    method: "GET",
  })
}

Ajax.post = function(business, path, body){

  var headers = new Headers({
    'Content-Type': 'application/json'
  })
  if(business.user && business.user.access_code ) headers.append( 'Authorization',business.user.access_code );
  return fetch(url + path,{
    headers: headers,
    body: JSON.stringify(body),
    mode: "cors",
    method: "POST",
  })
}

Ajax.put = function(business, path, body){

  var headers = new Headers({
    'Content-Type': 'application/json'
  })
  if(business.user && business.user.access_code ) headers.append( 'Authorization',business.user.access_code );
  return fetch(url + path,{
    headers: headers,
    body: JSON.stringify(body),
    mode: "cors",
    method: "PUT",
  })
}

Ajax.delete = function(business, path){

  var headers = new Headers({
    'Content-Type': 'application/json'
  })
  if(business.user && business.user.access_code ) headers.append( 'Authorization',business.user.access_code );
  return fetch(url + path,{
    headers: headers,
    mode: "cors",
    method: "DELETE",
  })
}


Number.prototype.round = function(p) {
  p = p || 10;
  return parseFloat( this.toFixed(p) );
};


module.exports = Ajax;
