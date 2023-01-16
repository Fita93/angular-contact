import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Contact, ContactState } from 'src/app/models/Contact';
import { ContactActions } from 'src/app/store/contacts/contact.actions';
import { ContactSelectors } from 'src/app/store/contacts/contact.selectors';
import { AddContactFormComponent, ViewContactFormEnum } from '../add-contact-form/add-contact-form.component';
import { ConfirmDeleteContactComponent } from '../confirm-delete-contact/confirm-delete-contact.component';
import { ListContactsDataSource } from './list-contacts-datasource';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListContactsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Contact>;
  dataSource: ListContactsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['actions', 'name', 'email'];

  constructor(private store: Store<ContactState>, private dialog: MatDialog) {
    const contacts$ = this.store.select(ContactSelectors.selectAllContacts);
    this.dataSource = new ListContactsDataSource(contacts$);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  editContact(id: number): void {
    this.dialog.open(AddContactFormComponent, { data: { view: ViewContactFormEnum.EDIT, id } })
  }

  deleteContact(id: number): void {
    this.dialog.open(ConfirmDeleteContactComponent, { data: id });
  }
}
