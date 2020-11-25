import { User } from "../../models/User";

export const mapCognitoAttributes = (attributes: any): User => {
  return {
    email: attributes.email,
    name: attributes.name,
    familyName: attributes.family_name,
  };
};