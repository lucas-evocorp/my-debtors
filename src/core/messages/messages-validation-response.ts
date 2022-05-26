export const messagesValidation = {
  isNotBlank: (param: string) => {
    return `O campo ${param} não pode estar vazio`;
  },

  minLength: (param: string, value: number) => {
    return `${param} precisa ter no minimo ${value} caracteres`;
  },

  maxLength: (param: string, value: number) => {
    return `${param} só pode ter no maximo ${value} caracteres`;
  },

  isNumber: (param: string) => {
    return `O campo ${param} precisa ser um valor numerico`;
  },

  isDate: (param: string) => {
    return `O campo ${param} precisa ser uma data`;
  },

  isString: (param: string) => {
    return `O campo ${param} precisa ser um texto`;
  },

  isUUID: (param: string) => {
    return `O campo ${param} precisa estar no formato UUID`;
  },

  isEmail: () => {
    return `Por favor, insira um Email valido!`;
  },

  isPositive: (param: string) => {
    return `o campo ${param} precisa receber um numero positivo!`;
  },
};
