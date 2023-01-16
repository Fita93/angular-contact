import { createAction, props } from "@ngrx/store";
import { Contact } from "src/app/models/Contact";

const upsertContact = createAction('[Contact] Upsert Contact', props<{ contact: Contact }>());
const deleteContact = createAction('[Contact] Delete Contact', props<{ id: number }>());

export const ContactActions = {
  upsertContact,
  deleteContact
}
