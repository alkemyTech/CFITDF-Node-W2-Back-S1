import app from "../src/server.js";
import config from "../src/config/index.js";
const PORT = config.SERVER_PORT;
console.log("starting...");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
