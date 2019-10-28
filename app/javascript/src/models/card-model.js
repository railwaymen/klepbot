class CardModel {
  constructor ({ id, first_name, last_name, email, body }) {
    this.id = id;
    this.firstName = first_name || '';
    this.lastName = last_name || '';
    this.email = email;
    this.body = body;
  }

  replaceAttributesForEmailTemplate = (template) => {
    let resolvedTempalte = template;

    ['firstName', 'lastName', 'email'].forEach(word => {
      resolvedTempalte = resolvedTempalte.replace(`{${word}}`, this[word]);
    });

    return resolvedTempalte;
  }
}

export default CardModel;
