const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the .proto file
const packageDefinition = protoLoader.loadSync("calculator.proto");
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;

// Create a gRPC client
const client = new calculatorProto.Calculator("127.0.0.1:50051", grpc.credentials.createInsecure());

// Call the Add method
client.Add({ num1: 10, num2: 5 }, (error, response) => {
  if (!error) {
    console.log("Addition Result:", response.result);
  } else {
    console.error("Error:", error);
  }
});

// Call the Multiply method
client.Multiply({ num1: 6, num2: 7 }, (error, response) => {
  if (!error) {
    console.log("Multiplication Result:", response.result);
  } else {
    console.error("Error:", error);
  }
});
