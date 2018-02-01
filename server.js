// if (process.env.NODE_ENV == "production" && process.env.NODE_ENV == "staging") 
require("newrelic");

/**
 * How to change APIs for this project
 * 
 */
require("./server.utils")(require("./app/settings"));