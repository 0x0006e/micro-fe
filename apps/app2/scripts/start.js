process.env.NODE_ENV = "development";

import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import createConfig from "../config/webpack.config";
import devServerOptions from "../config/devServer.config";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 9002;

const webpackConfig = createConfig(process.env.NODE_ENV);
const complier = webpack(webpackConfig);

const devServer = new WebpackDevServer(complier, devServerOptions);

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, function () {
    devServer.close();
    process.exit();
  });
});

devServer.listen(PORT, HOST, console.error);
