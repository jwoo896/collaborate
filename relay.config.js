// relay.config.js
module.exports = {
    // ...
    // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
    src: "./src",
    schema: "./server/schema/schema.js",
    exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
}