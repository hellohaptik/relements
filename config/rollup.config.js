// rollup.config.js

import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import alias from "rollup-plugin-alias";
import url from "@rollup/plugin-url";
import postcss from "rollup-plugin-postcss";
import reactSvg from "rollup-plugin-react-svg";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import path from "path";
import chunkExports from "./exports";

const getPath = pathname => path.join(__dirname, `../${pathname}`);

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  alias({
    constants: getPath("src/constants"),
    api: getPath("src/api"),
    components: getPath("src/components"),
    icons: getPath("src/icons"),
    utils: getPath("src/utils"),
    decorators: getPath("src/decorators"),
    resolve: [".js", "/index.js", ".scss", ".svg", ".css"],
  }),
  reactSvg({
    svgo: {
      plugins: [{ cleanupIDs: false }, { removeViewBox: false }],
      multipass: false,
    },
  }),
  json(),
  url({
    include: ["**/*.woff", "**/*.woff2"],
    limit: Infinity,
  }),
  postcss({
    modules: { globalModulePaths: ["node_modules/"] },
    use: [["sass", { includePaths: ["src/"] }]],
  }),
  resolve({ extensions: [".js", ".json", ".svg"] }),
  commonjs({
    include: "node_modules/**",
    namedExports: {
      "node_modules/react/react.js": [
        "Children",
        "Component",
        "PropTypes",
        "createElement",
      ],
      "node_modules/react-dom/index.js": ["render", "createPortal"],
    },
  }),
  babel({ exclude: "node_modules/**" }),
];

// eslint-disable-next-line no-undef
const productionOnlyPlugins =
  process.env.NODE_ENV === "production" ? [terser()] : [];

const styledEsmModule = [
  "space",
  "shadow",
  "color",
  "border",
  "variant",
  "typography",
  "layout",
  "position",
  "flexbox",
];

const globalFiles = {
  globals: {
    react: "React",
    "react-dom": "ReactDOM",
    "prop-types": "PropTypes",
    "styled-components": "styled",
    ...styledEsmModule.reduce((acc, module) => {
      acc[`@styled-system/${module}`] = module;
      return acc;
    }, {}),
  },
  externals: [
    "react",
    "react-dom",
    "prop-types",
    "styled-components",
    ...styledEsmModule.map(module => `@styled-system/${module}`),
  ],
};

export default [
  {
    input: { index: "src/index.js", ...chunkExports },
    output: [
      {
        dir: "build/esm",
        format: "esm",
        globals: globalFiles.globals,
      },
    ],
    external: globalFiles.externals,
    plugins,
  },
  {
    input: "src/index.js",
    output: [
      {
        name: "Relements",
        file: "build/bundle.umd.js",
        format: "umd",
        globals: globalFiles.globals,
      },
    ],
    external: globalFiles.externals,
    plugins: [...plugins, ...productionOnlyPlugins],
  },
];
