import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: '<body><h2>Hello {{name}}!</h2></body>'
})
export class AppComponent {
  name: string = "You";
}
