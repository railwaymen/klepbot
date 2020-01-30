class ValidatorHelper {
  constructor() {
    this.errors = {};
  }

  presence = (attributes) => {
    const keys = Object.keys(attributes);

    keys.forEach(key => {
      const attribute = attributes[key];

      if ([null, '', undefined].includes(attribute)) {
        this.errors[key] = 'Can\'t be blank';
      }
    })
  }

  isValid = () => Object.keys(this.errors).length === 0;
}

export default ValidatorHelper;
