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
    return ApiService.put({
      url: `cards/${id}`,
      body: JSON.stringify({ card: attributes }),
    })
  }
}

export default CardsService;
