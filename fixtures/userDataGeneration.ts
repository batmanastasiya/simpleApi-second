export const generateUserData = (args?: Record<any, any>) => {
  const data = {
    name: `test${new Date().getTime()}`,
    username: `test${new Date().getTime()}`,
    password1: 'password',
    password2: 'password',
  };
  return {
    ...data,
    ...args,
  };
};
