import type { StreamInterceptor, UnaryInterceptor } from "grpc-web";

declare const __gRPC_devtools__:
  | undefined
  | {
      gRPCDevtoolsStreamInterceptor: StreamInterceptor<unknown, unknown>;
      gRPCDevtoolsUnaryInterceptor: UnaryInterceptor<unknown, unknown>;
    };

const gRPCDevtoolsStreamInterceptor =
  typeof __gRPC_devtools__ === "object" &&
  __gRPC_devtools__ !== null &&
  __gRPC_devtools__.gRPCDevtoolsStreamInterceptor;
export const streamInterceptors = gRPCDevtoolsStreamInterceptor
  ? [gRPCDevtoolsStreamInterceptor]
  : [];

const gRPCDevtoolsUnaryInterceptor =
  typeof __gRPC_devtools__ === "object" &&
  __gRPC_devtools__ !== null &&
  __gRPC_devtools__.gRPCDevtoolsUnaryInterceptor;
export const unaryInterceptors = gRPCDevtoolsUnaryInterceptor
  ? [gRPCDevtoolsUnaryInterceptor]
  : [];
