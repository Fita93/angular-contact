import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Contact, ContactState } from 'src/app/models/Contact';
import { ContactActions } from 'src/app/store/contacts/contact.actions';

@Component({
  selector: 'app-confirm-delete-contact',
  templateUrl: './confirm-delete-contact.component.html',
  styleUrls: ['./confirm-delete-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDeleteContactComponent {

  constructor(
    private store: Store<ContactState>,
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: Contact) {
  }

  deleteContact(): void {
    this.store.dispatch(ContactActions.deleteContact({ id: this.data.id }));
    this.dialogRef.close();
  }
}
