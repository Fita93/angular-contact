import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/models/AppState";
import { ContactState } from "src/app/models/Contact";
import { contactEntityAdapter } from "./contact.reducers";


const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = contactEntityAdapter.getSelectors();

const selectContactState = createFeatureSelector<ContactState>('contacts');

export const ContactSelectors = {
  selectAllContacts: createSelector(selectContactState, selectAll),
  selectContactById: (id: number) => createSelector(selectContactState, ({ entities }) => entities[id])
};
