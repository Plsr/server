import net from "net";
import { parseRequestHeaders } from "./util/http";
import { HttpRequest } from "./HttpRequest";

const server = net.createServer();
server.on("connection", handleConnection);
server.listen(3000);

function handleConnection(socket: net.Socket) {
  socket.on("connect", () => console.log("connected"));
  socket.on("close", () => console.log("connection closed"));
  socket.on("data", (data) => {
    console.log("received data");
    console.log(data.join(" "));
    console.log("converted data");

    // TODO: This should do more
    const lines = parseRequestHeaders(data);
    const request = new HttpRequest(data);
    console.log(request.requestMethod);
    console.log(request.httpVersion);
    console.log(request);

    // TODO: Actually send a reply
    // TODO: Find out if there is something responsing to the specified
    // method at the specified route
    socket.end();
  });
}
