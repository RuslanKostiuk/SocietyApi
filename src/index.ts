"use strict";

import { start } from "./start";

(async () => {
    try {
        await start();
    } catch (err) {
        console.error(`Error starting server: ${err.message}`);
        process.exit(-1);
    }
})();