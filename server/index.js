const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(
  __dirname + "/../protos/chat.proto",
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

function main() {
  const port = "0.0.0.0:9090";
  const server = new grpc.Server();
  const chat_proto = grpc.loadPackageDefinition(packageDefinition).chat;
  server.addService(chat_proto.ChatService.service, { sendMessage, onMessage });
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err) {
      console.error(err);
    } else {
      server.start();
      console.log(`Server running at ${port}`);
    }
  });
}
main();

/**
 * @type {Record<string, grpc.ServerWritableStream<any, any>>}
 */
const activeUsers = {};

/**
 * @type {Record<string, grpc.ServerWritableStream<any, any>>}
 */
const inactiveUsers = {};

/**
 * @param {grpc.ServerUnaryCall<any, any>} call
 * @param {grpc.sendUnaryData<any>} callback
 */
function sendMessage(call, callback) {
  const request = call.request;

  if (inactiveUsers[call.request.id]) {
    callback({ code: grpc.status.ALREADY_EXISTS });
  } else if (request.message.includes("leave")) {
    Object.values(activeUsers).forEach((user) => {
      user.write({ id: call.request.id, message: `(left)` });
    });
    activeUsers[call.request.id].end();
    delete activeUsers[call.request.id];
    inactiveUsers[call.request.id] = true;

    const metadata = new grpc.Metadata();
    metadata.add("response-metadata-example", "sendMessage");
    callback(null, null, metadata);
  } else {
    Object.values(activeUsers).forEach((user) => {
      user.write(call.request);
    });

    const metadata = new grpc.Metadata();
    metadata.add("response-metadata-example", "sendMessage");
    callback(null, null, metadata);
  }
}

/**
 * @param {grpc.ServerWritableStream<any, any>} call
 */
function onMessage(call) {
  activeUsers[call.request.id] = call;

  Object.values(activeUsers).forEach((user) => {
    user.write({ id: call.request.id, message: `(entered)` });
  });
}
