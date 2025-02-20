# grpc-spring-boot-app

This project is a Spring Boot application that integrates gRPC for remote procedure calls. 

## Project Structure

```
grpc-spring-boot-app
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── grpc
│   │   │               ├── GrpcApplication.java
│   │   │               ├── service
│   │   │               │   └── GrpcServiceImpl.java
│   │   │               └── config
│   │   │                   └── GrpcConfig.java
│   │   ├── proto
│   │   │   └── service.proto
│   │   └── resources
│   │       └── application.properties
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── grpc
│                       └── GrpcApplicationTests.java
├── pom.xml
└── README.md
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd grpc-spring-boot-app
   ```

2. **Build the project**:
   ```bash
   mvn clean install
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

## Usage

- The gRPC service can be accessed at the configured endpoint.
- Ensure that the necessary dependencies are included in the `pom.xml` file.

## Dependencies

This project uses the following key dependencies:
- Spring Boot
- gRPC
- Protocol Buffers

## Testing

Unit tests are included in the `src/test/java/com/example/grpc/GrpcApplicationTests.java` file to verify the application context and service functionality. Run the tests using:

```bash
mvn test
```