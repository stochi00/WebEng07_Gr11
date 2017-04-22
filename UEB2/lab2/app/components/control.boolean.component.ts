import {Component, Input} from '@angular/core';
import {ControlUnit} from "../model/controlUnit";
import {DatePipe} from "@angular/common";

@Component({
    moduleId: module.id,
    selector: 'control-boolean',
    templateUrl: '../views/controlboolean.html'
})

export class ControlBoolean{
    @Input() controlunit: ControlUnit;
    log:LogEntry[] = [];
    chartLabels:string[] = ['An','Aus'];
    charData:number[] = [0,0];
    chartType:string = 'doughnut';


    setValue(value: boolean){
        this.log.push(new LogEntry((this.controlunit.current?"An":"Aus"), (value?"An":"Aus")));
        this.controlunit.current=(value?1:0);

        if(value)
            this.charData[0]++;
        else
            this.charData[1]++;
        this.charData = this.charData.slice();
    }

    logToString(): string {
        var history: string = "";

        for (var i = 0; i < this.log.length; i++) {

            var element = this.log[i];
            history += element + "\n";
        }

        return history;
    }
}

class LogEntry {
    datepipe: DatePipe;
    datetime: Date;
    oldvalue: any;
    newvalue: any;


    public constructor(oldvalue: any, newvalue: any){

        this.datepipe = new DatePipe('DE-de');
        this.datetime = new Date();
        this.oldvalue = oldvalue;
        this.newvalue = newvalue;
    }

    toString() :string
    {
        return this.datepipe.transform(this.datetime,"dd.MM.yyyy hh:mm:ss") + " " + " " + this.oldvalue + " -> " + this.newvalue;
    }
}

