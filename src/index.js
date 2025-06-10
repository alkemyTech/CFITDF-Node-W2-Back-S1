import app from "./server.js";
import config from "./config/index.js";
const PORT = config.SERVER_PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
