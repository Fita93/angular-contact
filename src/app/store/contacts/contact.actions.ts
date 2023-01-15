import { createAction, props } from "@ngrx/store";
import { Contact } from "src/app/models/Contact";

const upsertContact = createAction('[Contact] Upsert Contact', props<{ contact: Contact }>());

export const ContactActions = {
  upsertContact
}
