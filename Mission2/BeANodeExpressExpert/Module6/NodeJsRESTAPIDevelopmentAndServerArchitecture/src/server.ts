import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);
    // console.log(req.method);
    const url = req.url;
    const method = req.method;
    if (url === "/" && method === "GET") {
      // console.log(`This is Root Route`);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is Root route" }));
    } else if (url?.startsWith("/products")) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is Products route" }));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Page Not Found" }));
    }
  },
);

server.listen(5000, () => {
  console.log(`Server is running on the PORT 5000`);
});
