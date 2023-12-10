// @ts-nocheck

export const unaryInterceptors = window.__gRPC_devtools__
  ? [window.__gRPC_devtools__.gRPCDevtoolsUnaryInterceptor]
  : [];

export const streamInterceptors = window.__gRPC_devtools__
  ? [window.__gRPC_devtools__.gRPCDevtoolsStreamInterceptor]
  : [];
