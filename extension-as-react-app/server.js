import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  const filePath = path.join("dist", req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }
    res.writeHead(200, {
      "content-type": "application/javascript; utf-8",
      "access-control-allow-origin": "*",
    });
    res.end(data);
  });
});

const port = Number(process.argv[2]) ?? 3002;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
