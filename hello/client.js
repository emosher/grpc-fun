const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the .proto file
const packageDefinition = protoLoader.loadSync("hello.proto");
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

// Create a gRPC client
const client = new helloProto.Greeter("127.0.0.1:50051", grpc.credentials.createInsecure());

// Call the SayHello method
client.SayHello({ name: "World" }, (error, response) => {
  if (!error) {
    console.log("Server Response:", response.message);
  } else {
    console.error("Error:", error);
  }
});
