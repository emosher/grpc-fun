const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load order.proto
const orderPackageDefinition = protoLoader.loadSync("order.proto");
const orderProto = grpc.loadPackageDefinition(orderPackageDefinition).order;

// Load inventory.proto (to call the Inventory Service)
const inventoryPackageDefinition = protoLoader.loadSync("inventory.proto");
const inventoryProto = grpc.loadPackageDefinition(inventoryPackageDefinition).inventory;

// Create a client to connect to the Inventory Service
const inventoryClient = new inventoryProto.InventoryService(
  "127.0.0.1:50052",
  grpc.credentials.createInsecure()
);

// Implement CreateOrder method
function createOrder(call, callback) {
  const { item, quantity } = call.request;

  // Check inventory first
  inventoryClient.CheckStock({ item, quantity }, (error, response) => {
    if (!error && response.available) {
      callback(null, { success: true, message: `Order placed for ${quantity} ${item}(s).` });
    } else {
      callback(null, { success: false, message: "Insufficient stock or item not found." });
    }
  });
}

// Start the Order Service gRPC server
const server = new grpc.Server();
server.addService(orderProto.OrderService.service, { CreateOrder: createOrder });

server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Order Service running on 127.0.0.1:50051");
  server.start();
});
