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

 /* *************************************************
  * API - List Devices
  *
  * Angabe: Abrufen aller Geräte als Liste
  *
  * URL: /listDevices
  * TYPE: POST
  * PARAM: <none>
  *
  * RETURN TYPE: JSON
  * RETURN: status - "OK" or "ERROR"
  *         message - reason why it failed, "List successful sent." otherwise
  *         devices - Array of devices (like in the source file [resources/devices.json])
  */

app.post("/listDevices", function (req, res) {
    "use strict";

    var json = {
        status: "OK",
        message: "List successful sent.",
        devices: devices.devices
    }

    res.json(json)
    res.end();
});

/* *************************************************
 * API - Add Device
 *
 * Angabe: Hinzufügen eines neuen Gerätes
 *
 * URL: /addDevice
 * TYPE: POST (application/json)
 * PARAM: device - [same like in resources/devices.json without id part]
 *
 * RETURN TYPE: JSON
 * RETURN: status - "OK" or "ERROR"
 *         message - reason why it failed, "Device added successfully." otherwise
 */

app.post("/addDevice", function (req, res) {
    "use strict";

    var status_OK = "OK";
    var status_ERROR = "ERROR";

    var message = "Device added successfully.";
    var status = status_OK;

    try{
       //create new uuid
        req.body.id = uuid();

        //add device
        devices.devices.push(req.body);

        //TODO inform all sockets


    }catch (ex){
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
 * API - Delete Device
 *
 * Angabe: Löschen eines vorhandenen Gerätes
 *
 * URL: /deleteDevice
 * TYPE: POST
 * PARAM: id  - id of device

 *
 * RETURN TYPE: JSON
 * RETURN: status - "OK" or "ERROR"
 *         message - reason why it failed, "Device deleted successfully." otherwise
 */

app.post("/deleteDevice", function (req, res) {
    "use strict";

    var status_OK = "OK";
    var status_ERROR = "ERROR";

    var message = "Device deleted successfully.";
    var status = status_OK;

    try{
        var targetIndex;

        //find device
        for (var i in devices.devices){
            if(devices.devices[i].id == req.body.id){
                targetIndex = i;
                break;
            }
        }
        if(targetIndex === undefined)
            throw new Error("Device not found.");

        devices.devices.splice(targetIndex,1);

        //TODO: inform all sockets

    }catch (ex){
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
 * API - Update Device
 *
 * Angabe: Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)
 *
 * URL: /updateDevice
 * TYPE: POST
 * PARAM: id  - id of device
 *        name - name of control_unit
 *        value - current value (see "current")
 *              - boolean: 0 or 1
 *              - enum: name of value (not id!!)
 *              - continuous: value in range, otherwise error
 *
 * RETURN TYPE: JSON
 * RETURN: status - "OK" or "ERROR"
 *         message - reason why it failed, "Device changed successfully." otherwise
 */

app.post("/updateDevice", function (req, res) {
    "use strict";
    var status_OK = "OK";
    var status_ERROR = "ERROR";

    var message = "Device change successfully.";
    var status = status_OK;

    try{
        var targetDevice;
        var targetUnit;

        //find device
        for (var i in devices.devices){
            if(devices.devices[i].id == req.body.id){
                targetDevice = devices.devices[i];
                break;
            }
        }
        if(targetDevice === undefined)
            throw new Error("Device not found.");

        //find control unit
        for (var i in targetDevice.control_units){
            if(targetDevice.control_units[i].name == req.body.name){
                targetUnit = targetDevice.control_units[i];
                break;
            }
            throw new Error("Control unit not found.");
        }

        //find possible values and set the new value.
        switch(targetUnit.type){
            case "continuous":
                if(req.body.value<targetUnit.min || req.body.value > targetUnit.max)
                    throw new Error("Continuous value out of range.");
                break;

            case "boolean":
                if(req.body.value!=0 && req.body.value != 1)
                    throw new Error("Boolean value out of range.");
                break;

            case "enum":
                if(targetUnit.values.indexOf(req.body.value) <= -1)
                    throw new Error("Enum value out of range.");
                break;

            default:
                throw new Error("Control unit type unknown.");
        }

        //set value
        targetUnit.current = req.body.value;

        //TODO: inform all sockets

    }catch (ex){
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
 * API - login
 *
 * Angabe: Log-in und Log-out des Benutzers
 *
 * URL: /login
 * TYPE: POST
 * PARAM: username  - old password
 *        password - new password
 *
 * RETURN TYPE: JSON
 * RETURN: status - "OK" or "ERROR"
 *         message - reason why it failed, "Login successful." otherwise
 */

app.post("/login", function (req, res) {
    "use strict";
    //TODO Log-in und Log-out des Benutzers
    /*
     * @Manuel habe ich selbst definiert
     */
    var status_OK = "OK";
    var status_ERROR = "ERROR";

    var message = "Login successful.";
    var status = status_OK;

    try{
        if(req.body.username !== validUsername) throw new Error("Wrong username or password.(0)");
        if(req.body.password !== validUserpassword) throw new Error("Wrong username or password. (1)");

        //create socket


    }catch (ex){
        status = status_ERROR;
        message = ex.message;

        wrongLogins ++;
    }

    var json = {
        status: status,
        message: message
    }

    res.json(json)
    res.end();

});


/* *************************************************
 * API - Change Password
 *
 * Angabe: Ändern des Passworts
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
    var status_OK = "OK";
    var status_ERROR = "ERROR";

    var message = "Password changed successfully.";
    var status = status_OK;

    try{
        if(req.body.oldpwd !== validUserpassword) throw new Error("Wrong password entered.");
        if(req.body.newpwd !== req.body.newpwd_rep) throw new Error("New passwords are note equal.");

        var login_file = "username: admin@mail.com\npassword: " + req.body.newpwd;

        fs.writeFile('resources/login.config', login_file,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Data written successfully!");
        });


    }catch (ex) {
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
 * Angabe: Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).
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

/*
 * Angabe: Lesen Sie die Benutzerdaten aus dem login.config File ein.
 */

function readUser() {
    "use strict";
    fs.readFile('resources/login.config', function (err, data) {
        if (err) {
            return console.error(err);
        }

        validUsername = data.toString().substring(10, 24);
        validUserpassword = data.toString().substring(36, 42);
    });
}

/*
 * Angabe: Lesen Sie die Gerätedaten aus der devices.json Datei ein.
 */

function readDevices() {
    "use strict";
    /*
     * Damit die Simulation korrekt funktioniert, müssen Sie diese mit nachfolgender Funktion starten
     *      simulation.simulateSmartHome(devices.devices, refreshConnected);
     * Der zweite Parameter ist dabei eine callback-Funktion, welche zum Updaten aller verbundenen Clients dienen soll.
     */

    fs.readFile('resources/devices.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        devices = JSON.parse(data.toString());
        simulation.simulateSmartHome(devices.devices, refreshConnected);
    });
}

/*
 * Angabe: Übermitteln Sie jedem verbundenen Client die aktuellen Gerätedaten über das Websocket
 */

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

