# gRPC Web Devtools Example

1. Register interceptors:

   [`client/src/grpc-devtools.ts`](./client/src/grpc-devtools.ts):

   ```ts
   import type { StreamInterceptor, UnaryInterceptor } from "grpc-web";

   declare const __gRPC_devtools__:
     | undefined
     | {
         gRPCDevtoolsUnaryInterceptor: UnaryInterceptor<unknown, unknown>;
         gRPCDevtoolsStreamInterceptor: StreamInterceptor<unknown, unknown>;
       };

   export const gRPCDevtoolsUnaryInterceptors =
     typeof __gRPC_devtools__ === "object"
       ? [__gRPC_devtools__.gRPCDevtoolsUnaryInterceptor]
       : [];
   export const gRPCDevtoolsStreamInterceptors =
     typeof __gRPC_devtools__ === "object"
       ? [__gRPC_devtools__.gRPCDevtoolsStreamInterceptor]
       : [];
   ```

   [`client/src/chat-service.ts`](./client/src/chat-service.ts#L26-L30):

   ```ts
   import {
     gRPCDevtoolsUnaryInterceptors,
     gRPCDevtoolsStreamInterceptors,
   } from "./grpc-devtool.ts";

   const client = new EchoServicePromiseClient(host, creds, {
     unaryInterceptors: gRPCDevtoolsUnaryInterceptors,
     streamInterceptors: gRPCDevtoolsStreamInterceptors,
   });
   ```

2. Optional. Generate file descriptor:

   ```sh
   $ file_name=file_descriptor \
     && protoc --descriptor_set_out $file_name.bin **/*.proto \
     && protoc < $file_name.bin --decode=google.protobuf.FileDescriptorSet google/protobuf/descriptor.proto > $file_name \
     && rm $file_name.bin
   ```

   and upload it to the gRPC Web Devtools.

3. Start server gRPC service:

   ```shell
   cd server
   npm ci
   npm run dev
   ```

4. Start envoy proxy:

   ```shell
   envoy -c envoy.yaml
   ```

5. Start client dev server:

   ```shell
   cd client
   npm ci
   npm run dev
   ```

6. Open a browser tab and navigate to:

   ```
   localhost:8081
   ```
