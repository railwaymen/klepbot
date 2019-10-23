# frozen_string_literal: true

module Api
  class CardsController < BaseController
    def create
      card = Card.new(card_params)

      card.save!
      service = Cards::ImageService.new(card)
      service.call

      render json: service.card.as_json
    end

    private

    def card_params
      params.require(:card).permit(:image)
    end
  end
end
