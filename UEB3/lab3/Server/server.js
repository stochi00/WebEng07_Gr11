/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var fs = require("fs");
var expressWs = require('express-ws')(app);
var http = require('http');

var simulation = require('./simulation.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var uuid = require('uuid');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


// @Manuel selber erstellt
var connectedUsers;
var validUsername;
var validUserpassword;
var devices;

var startDate =  new Date();
var wrongLogins = 0;

//TODO Implementieren Sie hier Ihre REST-Schnittstelle
/* Ermöglichen Sie wie in der Angabe beschrieben folgende Funktionen:
 *  Abrufen aller Geräte als Liste
 *  Hinzufügen eines neuen Gerätes
 *  Löschen eines vorhandenen Gerätes
 *  Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)
 *  Log-in und Log-out des Benutzers
 *  Ändern des Passworts
 *  Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).
 *
 *  BITTE BEACHTEN!
 *      Verwenden Sie dabei passende Bezeichnungen für die einzelnen Funktionen.
 *      Achten Sie bei Ihrer Implementierung auch darauf, dass der Zugriff nur nach einem erfolgreichem Log-In erlaubt sein soll.
 *      Vergessen Sie auch nicht, dass jeder Client mit aktiver Verbindung über alle Aktionen via Websocket zu informieren ist.
 *      Bei der Anlage neuer Geräte wird eine neue ID benötigt. Verwenden Sie dafür eine uuid (https://www.npmjs.com/package/uuid, Bibliothek ist bereits eingebunden).
 */

app.post("/updateCurrent", function (req, res) {
    "use strict";
    //TODO Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */
    console.log('Parameter:' + req.params.id + ', ' + req.query.time);
    res.writeHead(200, {'Content-Type':   'text/html'});
    res.write("updateCurrent called");
    res.end();
});

/*********************************
 * Selbst definiert API Methoden *
 *********************************/

app.post("/listDevices", function (req, res) {
    "use strict";
    //TODO Abrufen aller Geräte als Liste
    /*
     * @Manuel habe ich selbst definiert
     */
    console.log('Parameter:' + req.params.id + ', ' + req.query.time);
    res.writeHead(200, {'Content-Type':   'text/html'});
    res.write("updateCurrent called");
    res.end();
});


app.post("/addDevice", function (req, res) {
    "use strict";
    //TODO Hinzufügen eines neuen Gerätes
    /*
     * @Manuel habe ich selbst definiert
     */
    console.log('Parameter:' + req.params.id + ', ' + req.query.time);
    res.writeHead(200, {'Content-Type':   'text/html'});
    res.write("updateCurrent called");
    res.end();
});


app.post("/deleteDevice", function (req, res) {
    "use strict";
    //TODO Löschen eines vorhandenen Gerätes
    /*
     * @Manuel habe ich selbst definiert
     */
    console.log('Parameter:' + req.params.id + ', ' + req.query.time);
    res.writeHead(200, {'Content-Type':   'text/html'});
    res.write("updateCurrent called");
    res.end();
});

/* *************************************************
 * API - Update Device
 *
 * URL: /updateDevice
 * TYPE: POST
 * PARAM: id  - id of device
 *        name - name of control_unit
 *        value - current value (see "current")
 *
 * RETURN TYPE: JSON
 * RETURN: status - "OK" or "ERROR"
 *         message - reason why it failed, "Device changed successfully." otherwise
 */

app.post("/updateDevice", function (req, res) {
    "use strict";
    //TODO Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)

    var status_OK = "OK";
    var status_ERROR = "ERROR";

    var message = "Device change successfully.";
    var status = status_OK;

    console.log('Parameter: id: ' + req.body.id + ', name: ' + req.body.name + ", value: " + req.body.value);

    try{
        if(req.body.oldpwd != validUserpassword) throw new Error("Wrong password entered.");
        if(req.body.newpwd != req.body.newpwd_rep) throw new Error("New passwords are note equal.");

        var login_file = "username: admin@mail.com\npassword: " + req.body.newpwd;

        fs.writeFile('resources/login.config', login_file,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Data written successfully!");
        });


    }catch (ex)
    {
        status = status_ERROR;
        message = ex.message;
    }

    var json = {
        status: status,
        message: message
    }

    res.json(json)
    res.end();

});


app.post("/login", function (req, res) {
    "use strict";
    //TODO Log-in und Log-out des Benutzers
    /*
     * @Manuel habe ich selbst definiert
     */
    console.log('Parameter:' + req.params.id + ', ' + req.query.time);
    res.writeHead(200, {'Content-Type':   'text/html'});
    res.write("updateCurrent called");
    res.end();
});


/* *************************************************
 * API - Change Password
 *
 * URL: /changePassword
 * TYPE: POST
 * PARAM: oldpwd  - old password
 *        newpwd - new password
 *        newpwd_rep - new password repeated
 *
 * RETURN TYPE: JSON
 * RETURN: status - "OK" or "ERROR"
 *         message - reason why it failed, "Password changed successfully." otherwise
 */

app.post("/changePassword", function (req, res) {
    "use strict";
    //TODO Ändern des Passworts

    var status_OK = "OK";
    var status_ERROR = "ERROR";

    var message = "Password changed successfully.";
    var status = status_OK;

    console.log('Parameter: oldpwd: ' + req.body.oldpwd + ', newpwd: ' + req.body.newpwd + ", newpwd_rep: " + req.body.newpwd_rep);

    try{
        if(req.body.oldpwd != validUserpassword) throw new Error("Wrong password entered.");
        if(req.body.newpwd != req.body.newpwd_rep) throw new Error("New passwords are note equal.");

        var login_file = "username: admin@mail.com\npassword: " + req.body.newpwd;

        fs.writeFile('resources/login.config', login_file,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Data written successfully!");
        });


    }catch (ex)
    {
        status = status_ERROR;
        message = ex.message;
    }

    var json = {
        status: status,
        message: message
    }

    res.json(json)
    res.end();
});

/* *************************************************
 * API - Server Status
 *
 * URL: /status
 * TYPE: GET
 * PARAM: <none>
 *
 * RETURN TYPE: JSON
 * RETURN: startdate - Server starting Date
 *         loginerrors - Count of invalid logins
 */

app.get("/status", function (req, res) {
    "use strict";
    //TODO Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).

    var json = {
        startdate: startDate.toString(),
        loginerrors: wrongLogins
    }

    res.json(json)
    res.end();
});

/*********************
 * Interne Funktion  *
 *********************/

function readUser() {
    "use strict";
    //TODO Lesen Sie die Benutzerdaten aus dem login.config File ein.

    console.log('readUser called');

    fs.readFile('resources/login.config', function (err, data) {
        if (err) {
            return console.error(err);
        }

        validUsername = data.toString().substring(10, 24);
        validUserpassword = data.toString().substring(36, 42);
    });
}

function readDevices() {
    "use strict";
    //TODO Lesen Sie die Gerätedaten aus der devices.json Datei ein.
    /*
     * Damit die Simulation korrekt funktioniert, müssen Sie diese mit nachfolgender Funktion starten
     *      simulation.simulateSmartHome(devices.devices, refreshConnected);
     * Der zweite Parameter ist dabei eine callback-Funktion, welche zum Updaten aller verbundenen Clients dienen soll.
     */

    console.log('readDevices called');

    fs.readFile('resources/devices.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        devices = JSON.parse(data.toString());
        simulation.simulateSmartHome(devices.devices, refreshConnected);
    });
}


function refreshConnected() {
    "use strict";
    //TODO Übermitteln Sie jedem verbundenen Client die aktuellen Gerätedaten über das Websocket
    /*
     * Jedem Client mit aktiver Verbindung zum Websocket sollen die aktuellen Daten der Geräte übermittelt werden.
     * Dabei soll jeder Client die aktuellen Werte aller Steuerungselemente von allen Geräte erhalten.
     * Stellen Sie jedoch auch sicher, dass nur Clients die eingeloggt sind entsprechende Daten erhalten.
     *
     * Bitte beachten Sie, dass diese Funktion von der Simulation genutzt wird um periodisch die simulierten Daten an alle Clients zu übertragen.
     */

    console.log('refreshConnected called');
}


var server = app.listen(8081, function () {
    "use strict";
    readUser();
    readDevices();

    var host = server.address().address;
    var port = server.address().port;
    console.log("Big Smart Home Server listening at http://%s:%s", host, port);
});

