import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Contact, ContactState } from '../models/Contact';

import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { ContactSelectors } from '../store/contacts/contact.selectors';
import { take } from 'rxjs';
import { ContactActions } from '../store/contacts/contact.actions';

@Injectable({
  providedIn: 'root',
})
export class ImportExportCSVService {
  constructor(private store: Store<ContactState>) {}

  /**
   * Will download a csv file
   */
  exportToCSV(): void {
    this.store
      .select(ContactSelectors.selectAllContacts)
      .pipe(take(1))
      .subscribe((contacts) => new AngularCsv(contacts, 'export', { quoteStrings: '' }));
  }

  /**
   * Parse CSV data
   * @param csvText csv data to parse
   */
  importCSV(csvText: string): void {
    this.store.dispatch(ContactActions.clearContacts());
    const contacts: Contact[] = [];
    let csvToRowArray = csvText.trim().split('\n');
    csvToRowArray.forEach((row) => {
      const splittedRow = row.split(',');
      contacts.push({
        id: parseInt(splittedRow[0]),
        name: splittedRow[1],
        email: splittedRow[2],
      });
    });
    this.store.dispatch(ContactActions.addContacts({ contacts }));
  }
}
