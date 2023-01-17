import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { ContactState } from 'src/app/models/Contact';
import { ContactActions } from 'src/app/store/contacts/contact.actions';
import { ContactSelectors } from 'src/app/store/contacts/contact.selectors';

enum ContactFormFields {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
}

export enum ViewContactFormEnum {
  NEW = 'new',
  EDIT = 'edit'
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef,
    private store: Store<ContactState>,
    @Inject(MAT_DIALOG_DATA)
    public data: { view: ViewContactFormEnum, id: number}
  ) {
    const defaultContact = {
      id: -1,
      name: '',
      email: ''
    };
    this.store
      .select(ContactSelectors.selectContactById(this.data.id))
      .pipe(
        take(1),
        tap((contact) => {
          if (!contact) {
            contact = {
              ...defaultContact
            };
          }
          this.form = this.fb.group({
            [ContactFormFields.ID]: [contact.id],
            [ContactFormFields.NAME]: [contact.name, [Validators.required]],
            [ContactFormFields.EMAIL]: [
              contact.email,
              [Validators.required, Validators.email],
            ],
          });
        })
      )
      .subscribe();
  }

  upsertContact(): void {
    this.store.dispatch(
      ContactActions.upsertContact({ contact: this.form.value })
    );
    this.dialogRef.close();
  }
}
