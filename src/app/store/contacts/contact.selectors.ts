import { createFeatureSelector } from "@ngrx/store";
import { ContactState } from "src/app/models/Contact";
import { contactEntityAdapter } from "./contact.reducers";

const selectContactState = (state: ContactState) => state;
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = contactEntityAdapter.getSelectors();

export const ContactSelectors = {
  selectAll
};
