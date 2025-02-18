const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the .proto file
const packageDefinition = protoLoader.loadSync("calculator.proto");
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;

// Implement the gRPC methods
const calculatorService = {
  Add: (call, callback) => {
    const result = call.request.num1 + call.request.num2;
    callback(null, { result });
  },
  Multiply: (call, callback) => {
    const result = call.request.num1 * call.request.num2;
    callback(null, { result });
  },
};

// Create and start the gRPC server
const server = new grpc.Server();
server.addService(calculatorProto.Calculator.service, calculatorService);

server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Calculator gRPC server running on 127.0.0.1:50051");
  server.start();
});
