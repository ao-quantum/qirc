const irc = require('irc-server');
const config = require('../config.json')

class qircServerCore {
    server;

    constructor() {
        this.server = irc.createServer();
    }

    initChannels() {
        config.channels.forEach(ch => {
            this.server.createChannel(ch)
            console.log("Loaded channel " + ch)
        });
        return;
    }

    /**
     * @typedef {number} Port
     * 
     * @param {Port} port QIRC Server Listening Post
     */
    initEvents(port) {
        this.server.on("listening", () => {
            console.log('Listening on port ' + port);
        });
        
        this.server.on("connection", (sock) => {
            const name = `${sock.remoteAddress}:${sock.remotePort}`; // Connecton name
            console.log("Connection incoming from " + name);
        
            sock.on("close", (err) => {
                if (err) throw err;
                console.log("Connection closed from " + name);
            });
        
            sock.on("connect", () => {
                console.log("Connection initiated by " + name)
                sock.connect();
            });
        
            sock.on("error", (err) => {
                console.log(name + " experienced an error.")
                console.log(err);
            });
        
            sock.on("timeout", () => {
                console.log(name + " timed out.")
            });
        
            sock.on("close", (err) => {
                if (err) {
                    console.log(name + " experienced and error.")
                    console.log(err)
                }
                console.log(name + " disconnected.")
            });
        });
        
        this.server.on("error", (err) => {
            console.log(err);
        });
        
        this.server.on("close", () => {
            console.log("server has been closed");
        });
        return;
    }

    /**
     * 
     * @param {Port} port QIRC Server Listening Port
     */
    listen(port, hostname) {
        this.server.listen(port, hostname, null, () => {
            return;
        });
    }
}

module.exports = qircServerCore;