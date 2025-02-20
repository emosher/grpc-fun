package com.example.grpc.service;

import com.example.grpc.MyServiceGrpc;
import com.example.grpc.YourRequest;
import com.example.grpc.YourResponse;
import net.devh.boot.grpc.server.service.GrpcService;
import io.grpc.stub.StreamObserver;

@GrpcService
public class GrpcServiceImpl extends MyServiceGrpc.MyServiceImplBase {
    @Override
    public void yourMethod(YourRequest request, StreamObserver<YourResponse> responseObserver) {
        YourResponse response = YourResponse.newBuilder()
            .setMessage("Response: " + request.getMessage())
            .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}