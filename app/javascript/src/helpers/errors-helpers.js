class ErrorsHelpers {
  constructor(errors) {
    this.errors = errors;

    this.keys = Object.keys(errors);
  }

  stringValuesWithNames = () => {
    return this.keys.map(key => {
      return `${key} - ${this.errors[key].join(', ')}`
    });
  }

  stringValues = () => {
    return this.keys.map(key => {
      return `${this.errors[key].join(', ')}`
    });
  }
}

export function displayErrorMessages(error, type = 'stringValues') {
  if (ErrorsHelpers.prototype.isPrototypeOf(error)) {
    return error[type]();
  } else {
    return error.message;
  }
}

export default ErrorsHelpers;