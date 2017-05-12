import {Component, OnInit} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'my-sidebar',
  templateUrl: '../views/sidebar.component.html'
})
export class SidebarComponent implements OnInit{

  failed_logins: number = 0;
  server_start: Date = new Date();

  constructor(){}

  ngOnInit(): void {
    //TODO Lesen Sie über die REST-Schnittstelle den Status des Servers aus und speichern Sie diesen in obigen Variablen
  }
}
