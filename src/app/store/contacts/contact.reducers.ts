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
    if (!contact.id) {
      newContact.id = state.ids.length;
    }
    return contactEntityAdapter.upsertOne(newContact, state);
  })
);
