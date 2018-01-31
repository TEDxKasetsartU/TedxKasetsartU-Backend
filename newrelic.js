"use strict";
/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
    /**
   * Array of application names.
   */
    app_name: ["TEDxKU2018"],
    /**
   * Your New Relic license key.
   */
    license_key: "65b39267c9eedda38f9e7467f1fb077b86b804a1",
    logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
        level: "info"
    }
};