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

// ---------------------------------------------------------------------------------------------------------------------

var validUsername;
var validUserpassword;
var devices;

var startDate =  new Date();
var wrongLogins = 0;
var tokenBlacklist = [];

app.set('jwtTokenSecret', 'GROUP11_FTW');

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


/*
 *  Checks if the JWT header is available and correct.
 *
 *  RETURN: true - alright
 *          false - JWT header not correct (HTTP Error sent) *
 */

function authenticate(req, res)
{
    if (!req.headers.authorization){
        res.status(401).send('You are not authorized');
        return false;
    }

    var token = req.headers.authorization.split(' ')[1];

    if(tokenBlacklist.indexOf("" + token) > -1) {
        res.status(401).send('Token Expired');
        return false;
    }

    try {
        jwt.verify(token, app.get('jwtTokenSecret'));
        return true;
    } catch (e) {
        if (e.name === 'TokenExpiredError')
            res.status(401).send('Token Expired');
        else
            res.status(401).send('Authentication failed');

        return false;
    }
}

/*
 *  Adds the current token on a blacklist.
 *  This token is marked as invalid now.
 *
 *  RETURN: true - alright
 *          false - JWT header not found (HTTP Error sent) *
 */

function invalidateToken(req, res)
{
    if(!req.headers.authorization){
        res.status(401).send('You are not authorized');
        return false;
    }

    var token = req.headers.authorization.split(' ')[1];
    tokenBlacklist.push(""+token);
    return true;
}


/* *************************************************
 * API - Update Current
 *
 * Angabe: Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
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

app.post("/updateCurrent", function (req, res) {
    "use strict";
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */

    if(authenticate(req,res)){
        try{
            var targetDevice;
            var targetUnit;
            var targetValue;

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
            targetValue = req.body.value;
            switch(targetUnit.type){
                case "continuous":
                    if(req.body.value<targetUnit.min || req.body.value > targetUnit.max)
                        throw new Error("Continuous value out of range.");
                    break;

                case "boolean":
                    if(targetValue !==0 && targetValue !== 1)
                        throw new Error("Boolean value out of range.");
                    break;

                case "enum":
                    targetValue = targetUnit.values.indexOf(targetValue);
                    if(targetValue <= -1)
                        throw new Error("Enum value out of range.");
                    break;

                default:
                    throw new Error("Control unit type unknown.");
            }

            //set value
            simulation.updatedDeviceValue(targetDevice, targetUnit, Number(targetValue));

            //TODO: inform all sockets

        }catch (ex){
            res.status(400).send(ex.message);
            return;
        }

        res.status(200).send();
    }
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

    if(authenticate(req,res)){
        res.json(devices.devices);
        res.end();
    }
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

    if(authenticate(req,res)){
        try{
           //create new uuid
            req.body.id = uuid();

            //add device
            devices.devices.push(req.body);

            //TODO inform all sockets


        }catch (ex){
            res.status(400).send(ex.message);
            return;
        }
        res.status(200).send();
    }
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
 * RETURN TYPE: RAW
 * RETURN: HTTP 200 (OK): "Device deleted successfully."
 *         HTTP 400 (ERROR): Error Message
 */

app.post("/deleteDevice", function (req, res) {
    "use strict";

    if(authenticate(req,res)){
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
            res.status(400).send(ex.message);
        }

        res.status(200).send("Device deleted successfully.");
    }

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
 * RETURN TYPE: RAW
 * RETURN: HTTP 200 (OK): "Device updated successfully."
 *         HTTP 400 (ERROR): Error Message
 */

app.post("/updateDevice", function (req, res) {
    "use strict";

    if(authenticate(req,res)){
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
            targetDevice.name = req.body.name;

            //TODO: inform all sockets

        }catch (ex){
            res.status(400).send(ex.message);
            return;
        }

        res.status(200).send("Device updated successfully.");
    }
});

/* *************************************************
 * API - login
 *
 * Angabe: Log-in und Log-out des Benutzers
 *
 * URL: /login
 * TYPE: POST
 * PARAM: username  - username
 *        password - password
 *
 * RETURN TYPE: JSON /RAW
 * RETURN: HTTP 200 - token
 *         HTTP 400 - error message
 *
 *  For testing, put the received tockenstring as header attribute
 *  Authorization: Bearer <token>
 *  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNDk0NTE5NzY1fQ.mLzOEbjV7e-PCpRpi3Hu9qfLxCdxIt9qD5rtoevpLlY
 *
 */

app.post("/login", function (req, res) {
    "use strict";

    console.log("login attempt: username: " + req.body.username + " / password: " + req.body.password);

    try{
        if(req.body.username !== validUsername) throw new Error("Wrong username or password.(0)");
        if(req.body.password !== validUserpassword) throw new Error("Wrong username or password. (1)");

        //init JWT
        //var expires = moment().add('days', 7).valueOf();
        var token = jwt.sign({
            username: req.body.username
        }, app.get('jwtTokenSecret'));

        if(tokenBlacklist.indexOf(token) > -1)
            tokenBlacklist.splice(tokenBlacklist.indexOf(token),1);

        res.status(200).json(token);

    }catch (ex){
        res.status(400).send(ex.message);
        wrongLogins ++;
    }
});

/* *************************************************
 * API - logout
 *
 * Angabe: Log-in und Log-out des Benutzers
 *
 * URL: /login
 * TYPE: POST
 *
 * RETURN TYPE: JSON
 * RETURN: HTTP 200 - status - "OK" or "ERROR"
 *         HTTP 400 - reason why it failed, "Login successful." otherwise
 *
 */

app.post("/logout", function (req, res) {
    "use strict";

    if(invalidateToken(req,res)){
        res.status(200).send();
    }
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
 * RETURN TYPE: RAW
 * RETURN: HTTP 200 (OK): "Password changed."
 *         HTTP 400 (ERROR): Error Message
 *
 */

app.post("/changePassword", function (req, res) {
    "use strict";

    if(authenticate(req,res)){
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
            res.status(400).send(ex.message);
            return;
        }

        res.status(200).send("Password changed.");
    }
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

    if(authenticate(req,res)){
        res.json({
            startdate: startDate.toString(),
            loginerrors: wrongLogins
        });
        res.end();
    }
});

/*********************
 * Interne Funktion  *
 *********************/

/*
 * Angabe: Lesen Sie die Benutzerdaten aus dem login.config File ein.
 */

function readUser() {
    "use strict";
    var data = fs.readFileSync('resources/login.config');

    validUsername = data.toString().substring(10, data.toString().indexOf("\n") - 1);
    //console.log("<" + validUsername + ">");
    validUserpassword = data.toString().substring(data.toString().indexOf("\n") + 11);
    //console.log("<" + validUserpassword + ">");
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

    var data = fs.readFileSync('resources/devices.json');
    devices = JSON.parse(data.toString());
    simulation.simulateSmartHome(devices.devices, refreshConnected);
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

    //console.log('refreshConnected called');
}


var server = app.listen(8081, function () {
    "use strict";
    readUser();
    readDevices();

    var host = server.address().address;
    var port = server.address().port;
    console.log("Big Smart Home Server listening at http://%s:%s", host, port);
});

