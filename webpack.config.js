const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function (options = {}) {
  const NODE_ENV = options.NODE_ENV || "development"; // "production"
  const SOURCE_MAP = options.SOURCE_MAP || "eval-source-map"; // "source-map"

  console.log(`
Build started with following configuration:
===========================================
→ NODE_ENV: ${NODE_ENV}
→ SOURCE_MAP: ${SOURCE_MAP}
`);

  return {
    entry: {
      app: [
        path.resolve(__dirname, "app", "src", "main.tsx")
      ]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js?[hash]",
      publicPath: "/communities"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    bail: false,
    devtool: SOURCE_MAP,
    module: {
      rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }, {
        test: /\.s[ac]ss/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            implementation: require("dart-sass")
          }
        }]
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 32768
        }
      }]
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    plugins: createListOfPlugins({NODE_ENV}),
    devServer: {
      stats: {
        chunkModules: false,
        colors: true
      },
      historyApiFallback: true,
      inline: false
    }
  }
};

function createListOfPlugins({NODE_ENV}) {
  return [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app", "index.html"),
      favicon: path.resolve(__dirname, "app", "favicon.ico"),
      hash: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(NODE_ENV)
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([{from: "root"}], {ignore: ["*.json"]})
  ];
}
