const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load order.proto
const packageDefinition = protoLoader.loadSync("order.proto");
const orderProto = grpc.loadPackageDefinition(packageDefinition).order;

// Create a gRPC client for the Order Service
const client = new orderProto.OrderService("127.0.0.1:50051", grpc.credentials.createInsecure());

// Simulate an order
client.CreateOrder({ item: "apple", quantity: 3 }, (error, response) => {
  if (!error) {
    console.log("Order Service Response:", response.message);
  } else {
    console.error("Error:", error);
  }
});

// Try ordering an item not in stock
client.CreateOrder({ item: "banana", quantity: 10 }, (error, response) => {
  if (!error) {
    console.log("Order Service Response:", response.message);
  } else {
    console.error("Error:", error);
  }
});
