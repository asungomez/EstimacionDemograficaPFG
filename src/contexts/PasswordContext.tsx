import { createContext, useContext } from 'react';

export type PasswordRequirement = {
  rule: RegExp;
  message: string;
  error: string;
};

export type PasswordContextType = {
  policy: PasswordRequirement[];
};

const minPasswordLength = 6;

export const PasswordContext = createContext<PasswordContextType>({
  policy: [
    {
      rule: /(?=.*[A-Z])/,
      message: 'Mayúscula',
      error: 'La contraseña debe tener al menos una letra mayúscula',
    },
    {
      rule: /(?=.*[a-z])/,
      message: 'Minúscula',
      error: 'La contraseña debe tener al menos una letra minúscula',
    },
    {
      rule: /(?=.*[0-9])/,
      message: 'Número',
      error: 'La contraseña debe tener al menos un número',
    },
    {
      rule: /(?=.*\W)/,
      message: 'Símbolo',
      error: 'La contraseña debe tener al menos un símbolo',
    },
    {
      rule: new RegExp(`^.{${minPasswordLength},}$`),
      message: minPasswordLength + ' caracteres',
      error: `La contraseña debe tener al menos ${minPasswordLength} caracteres`,
    },
  ],
});

export const usePasswordContext = () => {
  return useContext(PasswordContext);
};
