import { parseRequestHeaders } from "./util/http";

const requestMethods = [
  "OPTIONS",
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "TRACE",
  "CONNECT",
] as const;

type RequestMethod = typeof requestMethods[number];

function isAllowedRequestMethod(candidate: string): candidate is RequestMethod {
  return (requestMethods as readonly string[]).includes(candidate);
}

export class HttpRequest {
  httpVersion: string;
  route: string;
  requestMethod: RequestMethod;

  constructor(requestData: Buffer) {
    const data = parseRequestHeaders(requestData);

    const reuqestMethodCandidate = Buffer.from(data[0])
      .toString()
      .split(" ")[0];

    if (!isAllowedRequestMethod(reuqestMethodCandidate)) {
      throw new Error(
        `Is not an allowed HTTP Request Method:
        ${reuqestMethodCandidate}`
      );
    }

    this.requestMethod = reuqestMethodCandidate;
    this.route = Buffer.from(data[0]).toString().split(" ")[1];
    this.httpVersion = Buffer.from(data[0]).toString().split(" ")[2];
  }
}
