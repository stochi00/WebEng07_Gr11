import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'navigation-accessibility-component',
    templateUrl: '../views/navigation-accessibility.html'
})

export class NavigationAccessibilityComponent {
    @Input() nav_acc_href_id: string;
}
