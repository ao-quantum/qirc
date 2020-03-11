const express = require('express');
const config = require('../config.json');

class quircWebPanel {
    app;

    /**
     * @typedef {string} Hostname
     * @typedef {number} Port
     * @typedef {string} Path
     * @typedef {string} WebPath
     */

    /**
     * @param {Port} port Port to listen. example: 80
     * @param {Hostname} hostname Hostname for the panel. example: example.com and 127.0.0.1
     * @param {Path} staticPath Static Files Path. example: static or something/static
     * @param {Path} pagesPath Pages Files Path. example: pages
     * @param {WebPath} panelPath Panel's Path in URLs. example: 
     */

    constructor(port, hostname, staticPath, pagesPath, panelPath) {
       this.app = express();

       this.app.use(panelPath + '/static', express.static('../' + staticPath))
       
       this.app.get(`${panelPath}/`, (req, res) => {
           res.sendFile('../' + pagesPath + '/index.html')
       })
       
       this.app.listen(port, hostname, null, () => {
           console.log(`Web Server Listening on ${hostname}:${port}`);
        })
        
        return this.app;
    }

    delete() {
        delete this.app
    }
}

module.exports = quircWebPanel;