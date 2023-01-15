import { EntityState } from "@ngrx/entity";

export interface ContactState extends EntityState<Contact> {

}

export interface Contact {
  id: number;
  name: string;
  email: string;
}
