import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Contact, ContactState } from 'src/app/models/Contact';
import { ContactActions } from './contact.actions';

export const contactEntityAdapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

const initialState: ContactState = contactEntityAdapter.getInitialState();

export const contactsReducers = createReducer(
  initialState,
  on(ContactActions.upsertContact, (state, { contact }) => {
    let newContact = {
      ...contact
    }
    if (contact.id < 0) {
      // Get the max Id and increment of 1
      newContact.id = Math.max(...state.ids as number[]) + 1;
    }
    return contactEntityAdapter.upsertOne(newContact, state);
  }),
  on(ContactActions.deleteContact, (state, { id }) => {
    return contactEntityAdapter.removeOne(id, state);
  }),
  on(ContactActions.addContacts, (state, { contacts }) => {
    return contactEntityAdapter.addMany(contacts, state);
  }),
  on(ContactActions.clearContacts, (state) => {
    return contactEntityAdapter.removeAll(state);
  }),
);
