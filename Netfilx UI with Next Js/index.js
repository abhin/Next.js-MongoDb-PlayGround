import http from "http";
import fs from "fs";

function handleRequest(req, res) {
    console.log(req.url)
  fs.readFile(
    `NetflixUI/${req.url == "/" ? "index.html" : req.url}`,
    (err, data) => {
      if (err) {
        res.write("404 Internal error");
      } else res.write(data);
      res.end();
    }
  );
}

const server = http.createServer(handleRequest);

server.listen(8000);
