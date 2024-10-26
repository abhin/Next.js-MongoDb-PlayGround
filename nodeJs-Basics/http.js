import http from 'http'


const handleRequest = (req, res) => {
    res.write('Hello');
    res.end();
}

const server = http.createServer(handleRequest);
console.log('Starting server')
server.listen(3001)
console.log('Ending server')