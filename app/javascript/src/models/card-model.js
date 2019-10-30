class CardModel {
  constructor ({ id, first_name, last_name, email, body, metadata, phone_numbers, websites }) {
    this.id = id;
    this.firstName = first_name || '';
    this.lastName = last_name || '';
    this.email = email;
    this.body = body;
    this.metadata = metadata;
    this.phone_numbers = phone_numbers;
    this.websites = websites;
  }

  toParams = () => {
    return {
      card: {
        body: this.body
      }
    }
  }

  status = () => {
    if ([undefined, null, ''].includes(this.body)) {
      return 'pending';
    } else {
      return 'ready';
    }
  }

  replaceAttributesForEmailTemplate = (template) => {
    let resolvedTempalte = template;

    ['firstName', 'lastName', 'email'].forEach(word => {
      resolvedTempalte = resolvedTempalte.replace(`{{${word}}}`, this[word]);
    });

    return resolvedTempalte;
  }
}

export default CardModel;
