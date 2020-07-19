const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.statusCode = 200;
  let body;

  switch(request.url){
    case '/':
      body = { stuff: 'this', nonsense: 'that'}; break;

    case '/reverse':
      if (request.method === 'GET'){
        body = "hello";
      } else if (request.method === 'POST') {
        // create the server side function here
        let reqBody = []
        let newMessage;
        request.on('data', chunk => reqBody.push(chunk));
        request.on('end', () => {
            newMessage = JSON.parse(reqBody);
            body = newMessage.split('').reverse().join('');
            // console.log(body);
            response.end(JSON.stringify(body));
      })}; break;
    default:
      response.statusCode = 404;
      body = {error: 'Unknown route'};
  }
};

const host = 'localhost';
const port = 8000;

const server = http.createServer(requestListener);
server.listen(port, host, () => console.log(`All cylinders firing on http://${host}:${port}`));
