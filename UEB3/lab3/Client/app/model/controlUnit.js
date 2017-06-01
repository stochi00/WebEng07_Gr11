"use strict";
/**
 * Definition für die Steuerungselemente eines Gerätes
 */
var ControlUnit = (function () {
    function ControlUnit() {
        /**
         * Aktueller Wert dieses ControlUnit
         * @type {number}
         */
        this.current = -1;
        /**
         * Minimaler Wert für dieses Steuerungslement (wir nur bei Kontinuierlichem Typ benötigt)
         * Legen Sie mit diesem Wert den minimalen Wert für eine Eingabe fest, um eine Falscheingabe zu verhindern
         *
         * @type {number}
         */
        this.min = -1;
        /**
         * Maximaler Wert für dieses Steuerungslement (wir nur bei Kontinuierlichem Typ benötigt)
         * Legen Sie mit diesem Wert den maximalen Wert für eine Eingabe fest, um eine Falscheingabe zu verhindern
         *
         * @type {number}
         */
        this.max = -1;
    }
    return ControlUnit;
}());
exports.ControlUnit = ControlUnit;
//# sourceMappingURL=controlUnit.js.map