import { User } from '../../../models/User';
import { UserAttributesRequest } from './AuthenticationServiceTypes';

export const mapCognitoAttributes = (attributes: any): User => {
  return {
    email: attributes.email,
    name: attributes.name,
    familyName: attributes.family_name,
    sub: attributes.sub,
  };
};

export const mapUserAttributesRequest = (
  firstName: string,
  lastName: string,
  email?: string
): UserAttributesRequest => {
  const request: UserAttributesRequest = {
    attributes: {},
  };

  if (firstName && firstName.length > 0) {
    request.attributes.first_name = firstName;
  }
  if (lastName && lastName.length > 0) {
    request.attributes.last_name = lastName;
  }
  if (email && email.length > 0) {
    request.attributes.email = email;
  }

  return request;
};
