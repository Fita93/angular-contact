import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContactFormComponent, ViewContactFormEnum } from './components/add-contact-form/add-contact-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'contact-app';

  constructor(public dialog: MatDialog) {}

  openNewContact(): void  {
    this.dialog.open(AddContactFormComponent, { data: { view: ViewContactFormEnum.NEW }, disableClose: true });
  }
}
