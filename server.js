// Initialisation
const irc = require('irc-server');
const config = require('./config.json');
const web = require('./util/webserver');

const PORT = process.env.ircport || config.port || 5000

const server = irc.createServer();

if (config.panel.enabled == true) {
    let webserver = new web(config.panel.port, config.panel.hostname, 'static', 'pages', config.panel.path)
}


// Channels

config.channels.forEach(ch => {
    server.createChannel(ch)
    console.log("Loaded channel " + ch)
});

// Listeners

server.on("listening", () => {
    console.log('Listening on port ' + PORT);
});

server.on("connection", (sock) => {
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

server.on("error", (err) => {
    console.log(err);
});

server.on("close", () => {
    console.log("server has been closed");
});

server.listen(PORT);
