const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load the inventory.proto file
const packageDefinition = protoLoader.loadSync("inventory.proto");
const inventoryProto = grpc.loadPackageDefinition(packageDefinition).inventory;

// Simulated inventory data
const stock = {
  apple: 10,
  banana: 5,
};

// Implement the CheckStock method
function checkStock(call, callback) {
  const { item, quantity } = call.request;
  const available = stock[item] >= quantity;
  callback(null, { available });
}

// Start the gRPC server
const server = new grpc.Server();
server.addService(inventoryProto.InventoryService.service, { CheckStock: checkStock });

server.bindAsync("127.0.0.1:50052", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Inventory Service running on 127.0.0.1:50052");
  server.start();
});
