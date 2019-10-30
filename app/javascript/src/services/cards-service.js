import ApiService from './api-service';
import CardModel from '../models/card-model';

class CardsService {
  static async all() {
    return ApiService.get({
      url: 'cards'
    }).then(cards => (
      cards.map(card => new CardModel(card))
    ))
  }

  static async update(id, attributes) {
    console.log(attributes);

    return ApiService.put({
      url: `cards/${id}`,
      body: JSON.stringify(attributes),
    })
  }
}

export default CardsService;
