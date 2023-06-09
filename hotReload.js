export default function CustomHmr() {
  return {
    name: "custom-hmr",
    enforce: "post",
    // HMR
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".glsl")) {
        console.log("reloading glsl file...");

        server.ws.send({
          type: "full-reload",
          path: "*",
        });
      }
    },
  };
}
