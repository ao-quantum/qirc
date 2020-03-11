// Initialisation
const config = require('./config.json');
const web = require('./util/webserver');
const core = require('./util/irc');

if (config.panel.enabled == true) {
    let webserver = new web(config.panel.port, config.panel.hostname, 'static', 'pages', config.panel.path)
}

const qirc = new core();
qirc.initChannels();
qirc.initEvents(config.port);
qirc.listen(config.port, config.hostname);
