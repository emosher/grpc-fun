const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the .proto file
const packageDefinition = protoLoader.loadSync("hello.proto");
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

// Implement the gRPC method
function sayHello(call, callback) {
  callback(null, { message: `Hello, ${call.request.name}!` });
}

// Start the gRPC server
const server = new grpc.Server();
server.addService(helloProto.Greeter.service, { SayHello: sayHello });

server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("gRPC server running at http://127.0.0.1:50051");
  server.start();
});
