module.exports = {
  unAuthorized: {
    error: true,
    message: 'UnAuthorized'
  },
  serverError: {
    error: true,
    message: 'Internal Server Error'
  },
  userAlreadyExists: {
    error: true,
    message: 'User Already Exist'
  },
  created: {
    error: false,
    message: 'Successfully Created'
  },
  invalidFile: {
    error: false,
    message: 'File Type Invalid'
  },
  fileNotFound: {
    error: true,
    message: 'File Not Found'
  }
};
