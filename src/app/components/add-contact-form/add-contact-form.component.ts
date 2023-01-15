import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Contact, ContactState } from 'src/app/models/Contact';
import { ContactActions } from 'src/app/store/contacts/contact.actions';

enum AddContactFormFields {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email'
}

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddContactFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: DialogRef, private store: Store<ContactState>) {
    this.form = this.fb.group({
      [AddContactFormFields.ID]: [null],
      [AddContactFormFields.NAME]: ['', [Validators.required]],
      [AddContactFormFields.EMAIL]: ['', [Validators.required, Validators.email]]
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  upsertContact(): void {
    this.store.dispatch(ContactActions.upsertContact({ contact: this.form.value }));
    this.closeDialog();
  }
}
