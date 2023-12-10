# gRPC Devtools Example

1. Start server gRPC service:

   ```shell
   cd server
   npm ci
   npm run dev
   ```

2. Start envoy proxy:

   ```shell
   envoy -c envoy.yaml
   ```

3. Start client dev server:

   ```shell
   cd client
   npm ci
   npm run dev
   ```

4. Open a browser tab and navigate to:

   ```
   localhost:8081
   ```
