import http from "http";
import fs from "fs";

function handleRequest(req, res) {
  console.log(req.url);
  const path = `NetflixUI${req.url == "/" ? "/index.html" : req.url}`;
  if (fs.existsSync(path)) {
    fs.readFile(path, (err, data) => {
      console.log(err);
      (err && res.write("500 Internal error")) || res.write(data);
      res.end();
    });
  } else {
    res.write("404 file not found");
    res.end();
  }
}

const server = http.createServer(handleRequest);

server.listen(8000);
