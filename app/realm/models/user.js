export const UserSchema = {
  name: 'User',
  properties: {
    profileImage: 'string?',
    name: 'string',
    email: 'string',
    password: 'string',
    cpf: 'string',
  },
};

export default UserSchema;
