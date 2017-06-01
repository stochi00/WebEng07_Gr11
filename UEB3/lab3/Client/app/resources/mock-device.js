"use strict";
var controlType_1 = require('../model/controlType');
exports.DEVICES = [
    {
        id: "a79acab4-e88b-11e6-bf01-fe55135034f3",
        description: "Genauere Informationen zu diesem Thermometer",
        display_name: "Heizkörper Esszimmer",
        type: "Heizkörperthermostat",
        type_name: "eQ-3 Smart",
        image: "images/thermometer.svg",
        image_alt: "Thermometer zur Temperatur einstellenanzeige",
        draw_image: drawThermometer,
        control_units: [{
                name: "Temperatur einstellen", type: controlType_1.ControlType.continuous, min: 0, max: 50, current: 0,
                primary: true
            }],
    },
    {
        id: "19ff7d47-bd80-4a5d-adfb-bc77558facad",
        description: "Genauere Informationen zu diesem Thermometer",
        display_name: "Heizkörper Badezimmer",
        type: "Heizkörperthermostat",
        type_name: "eQ-3 Smart",
        image: "images/thermometer.svg",
        image_alt: "Thermometer zur Temperatur einstellenanzeige",
        draw_image: drawThermometer,
        control_units: [{
                name: "Temperatur einstellen", type: controlType_1.ControlType.continuous, min: -10, max: 75, current: 27.4, primary: true
            }, { name: "Ein-/Ausschalten", type: controlType_1.ControlType.boolean, values: [""], current: 0, primary: false }]
    },
    {
        id: "38acc35d-40cc-4d56-bccd-da7da5c20cc4",
        description: "Genauere Informationen zu diesem Beleuchtungselement",
        display_name: "Beleuchtung Außen",
        type: "Beleuchtung",
        type_name: "Osram Lightify",
        image: "images/bulb.svg",
        draw_image: drawBulb,
        image_alt: "Glühbirne als Indikator für Aktivierung",
        control_units: [{ name: "Ein-/Ausschalten", type: controlType_1.ControlType.boolean, values: [""], current: 0, primary: true }]
    },
    {
        id: "11dfe2fd-c0e8-44cb-b788-6eec3e509236",
        description: "Genauere Informationen zu diesem Beleuchtungselement",
        display_name: "Beleuchtung Küche",
        type: "Beleuchtung",
        type_name: "Playbulb Smart",
        draw_image: drawBulb,
        image: "images/bulb.svg",
        image_alt: "Glühbirne als Indikator für Aktivierung",
        control_units: [{ name: "Ein-/Ausschalten", type: controlType_1.ControlType.boolean, values: [""], current: 1, primary: true }]
    },
    {
        id: "2c4380ad-42cc-450f-abab-2f09a3284e35",
        description: "Genauere Informationen zu dieser Webcam",
        display_name: "Kamera Vordertür",
        type: "Überwachungskamera",
        type_name: "ABUS Funk-Außenkamera TVAC16010A",
        image: "images/webcam.svg",
        draw_image: drawCam,
        image_alt: "Webcam als Indikator für Aktivierung",
        control_units: [{ name: "Ein-/Ausschalten", type: controlType_1.ControlType.boolean, values: [""], current: 1, primary: true }]
    },
    {
        id: "fe975956-1a79-4cad-b720-a118abab2a9f",
        description: "Genauere Informationen zu dieser Webcam",
        display_name: "Kamera Wohnzimmer",
        type: "Webcam",
        type_name: "HiKam S5",
        image: "images/webcam.svg",
        draw_image: drawCam,
        image_alt: "Webcam als Indikator für Aktivierung",
        control_units: [{ name: "Ein-/Ausschalten", type: controlType_1.ControlType.boolean, values: [""], current: 0, primary: true }]
    },
    {
        id: "c5a830e2-d089-427a-aaf8-5986753082aa",
        description: "Genauere Informationen zu diesem Rollladen",
        display_name: "Rollladen Wohnzimmer",
        type: "Rollladen",
        type_name: "Somfy RS100 io",
        image: "images/roller_shutter.svg",
        draw_image: drawShutter,
        image_alt: "Rollladenbild als Indikator für Öffnungszustand",
        control_units: [{
                name: "Rollladenstand",
                type: controlType_1.ControlType.enum,
                values: ["offen", "halb geöffnet", "geschlossen"],
                current: 1, primary: true
            }]
    },
    {
        id: "fe975256-1a79-4cad-b720-a118abab2a9f",
        description: "Genauere Informationen zu diesem Rollladen",
        display_name: "Rollladen Küche",
        type: "Rollladen",
        type_name: "Somfy RS100 io",
        image: "images/roller_shutter.svg",
        draw_image: drawShutter,
        image_alt: "Rollladenbild als Indikator für Öffnungszustand",
        control_units: [{
                name: "Rollladenstand",
                type: controlType_1.ControlType.enum,
                values: ["Aus", "Ein", "Standby"],
                current: 2, primary: true
            }]
    },
];
//# sourceMappingURL=mock-device.js.map