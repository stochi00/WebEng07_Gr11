/*
  TODO
 Implementieren Sie die folgenden Funktionen um die SVG-Grafiken der Geräte anzuzeigen und verändern.

 Hinweise zur Implementierung:
 - Verwenden Sie das SVG-Plugin für jQuery, welches bereits für Sie eingebunden ist (Referenz: http://keith-wood.name/svg.html)
 - Sie dürfen das Bild bei jedem Funktionenaufruf neu laden und Ihre Veränderungen vornehmen;
 Tipp: Durch Überschreiben der OnLoad Funktion von svg.load() können Sie die Grafik noch bevor diese zum ersten Mal angezeigt wird verändern
 - In allen bereit gestellten SVG-Grafiken sind alle für Sie relevanten Stellen mit Labels markiert.
 - Da Ihre Grafiken nur beim Laden der Übersichtsseite neu gezeichnet werden müssen, bietet es ich an die draw_image Funktionen nach dem vollständigen Laden dieser Seite auszuführen.
 Rufen Sie dazu mit draw_image(id, src, min, max, current, values) die zugrunde liegende und hier definierte Funktione auf.
 */

function drawThermometer(id, src, min, max, current, values) {

    $('#'+id).svg({loadURL: src, onLoad: function(svg, error) {
        var svg2 = $('#'+id).svg();

       // svg2.find("#title3855").text(current);
        svg2.find("#tspan3817").text(min);
        svg2.find("#tspan3817-6").text(max);

    }});
  /* TODO
   Passen Sie die Höhe des Temperaturstandes entsprechend dem aktuellen Wert an.
   Beachten Sie weiters, dass auch die Beschriftung des Thermometers (max, min Temperatur) angepasst werden soll.
   */
}

function drawBulb(id, src, min, max, current, values) {
    $('#'+id).svg({loadURL: src, onLoad: function(svg, error) {
        var svg2 = $('#'+id).svg();

        if (current == 1) {
            svg2.find("g path:first-child()").attr('fill', "yellow");
        } else {
            svg2.find("g path:first-child()").attr('fill', "black");
        }
    }});
}

function drawCam(id, src, min, max, current, values) {

    $('#'+id).svg({loadURL: src, onLoad: function(svg, error) {
        var svg2 = $('#'+id).svg();

        svg2.find("#circle8").attr('fill', "black");
        svg2.find("#path10").attr('fill', "white");

    }});
  /* TODO
    Verändern Sie die Darstellung der Webcam entsprechend den Vorgaben aus der Angabe.
    Dabei soll jedoch nicht nur einfach die Farbe der Elemente verändert werden, sondern es soll eine Kopie der zu verändernden Elemente erstellt
     und anschließend die aktuellen durch die angepassten Kopien ersetzt werden.
   */
}

function drawShutter(id, src, min, max, current, values) {
    $('#'+id).svg({loadURL: src, onLoad: function(svg, error) {
        var svg2 = $('#'+id).svg();

        if (current == 1) {
            svg2.find("#path4559-2").attr('visibility', "visible");
            svg2.find("#path4559-2-6").attr('visibility', "visible");
            svg2.find("#path4559-2-5").attr('visibility', "visible");
        } else if (current == 2) {
            svg2.find("#path4559-2").attr('visibility', "visible");
            svg2.find("#path4559-2-6").attr('visibility', "hidden");
            svg2.find("#path4559-2-5").attr('visibility', "hidden");
        } else {
            svg2.find("#path4559-2").attr('visibility', "hidden");
            svg2.find("#path4559-2-6").attr('visibility', "hidden");
            svg2.find("#path4559-2-5").attr('visibility', "hidden");
        }
    }});
}
