const validator = require('validator');
const exists = require('../models/auth/exists');
const { throw: throwValidator, safeString } = require('./validator');

module.exports = {
  register: async (request) => {
    const password = safeString(request.password);
    const cpassword = safeString(request.confirm_password);
    const email = safeString(request.email);

    if (
      !validator.isEmpty(password) &&
      !validator.isEmpty(cpassword) &&
      !validator.isEmpty(email)
    ) {
      if (validator.equals(password, cpassword) && validator.isEmail(email)) {
        const regex = new RegExp('^[0-9]{6}$');
        if (regex.test(password)) {
          const existsCheck = await exists({ email });
          if (existsCheck) {
            return throwValidator(
              false,
              'Email has been taken by another user'
            );
          } else {
            return throwValidator(true, 'Success', {
              email: validator.escape(email),
              password: validator.escape(password),
              confirm_password: validator.escape(cpassword),
            });
          }
        } else {
          return throwValidator(
            false,
            'Password only 6 digits and numeric only'
          );
        }
      } else
        return throwValidator(
          false,
          'Password, Confirm password and email must be valid data'
        );
    } else {
      return throwValidator(
        false,
        'Password, Confirm password, and email must be required'
      );
    }
  },
};
