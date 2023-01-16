import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactState } from "src/app/models/Contact";
import { contactEntityAdapter } from "./contact.reducers";


const {
  selectAll
} = contactEntityAdapter.getSelectors();

const selectContactState = createFeatureSelector<ContactState>('contacts');

export const ContactSelectors = {
  selectAllContacts: createSelector(selectContactState, selectAll),
  selectContactById: (id: number) => createSelector(selectContactState, ({ entities }) => entities[id])
};
