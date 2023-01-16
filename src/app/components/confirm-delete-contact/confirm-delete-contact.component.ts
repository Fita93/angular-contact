import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { Contact, ContactState } from 'src/app/models/Contact';
import { ContactActions } from 'src/app/store/contacts/contact.actions';
import { ContactSelectors } from 'src/app/store/contacts/contact.selectors';

@Component({
  selector: 'app-confirm-delete-contact',
  templateUrl: './confirm-delete-contact.component.html',
  styleUrls: ['./confirm-delete-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteContactComponent {
  contact$: Observable<Contact | undefined>;

  constructor(
    private store: Store<ContactState>,
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public contactId: number
  ) {
    this.contact$ = this.store.select(
      ContactSelectors.selectContactById(this.contactId)
    );
  }

  deleteContact(): void {
    this.store.dispatch(ContactActions.deleteContact({ id: this.contactId }));
    this.dialogRef.close();
  }
}
