import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  moduleId: module.id,
  selector: 'my-sidebar',
  templateUrl: '../views/sidebar.component.html'
})
export class SidebarComponent implements OnInit{

  failed_logins: number = 0;
  server_start: Date = new Date();

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit(): void {
    this.authenticationService.status().then(status => {
      this.failed_logins = status.loginerrors;
      this.server_start = status.startdate
    });
  }
}
