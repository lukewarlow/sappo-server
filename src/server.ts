import app from "./app";
import http from "http";
import SocketIO from "socket.io";

/**
 * Start Express server.
 */
const server = new http.Server(app);
server.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export const io = SocketIO(server);

export default server;
