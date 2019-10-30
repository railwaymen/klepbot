# frozen_string_literal: true

module Api
  class CardsController < BaseController
    def index
      cards = Card.order(created_at: :desc)

      render json: cards.as_json
    end

    def create
      card = Card.new(card_params)

      card.save!
      service = Cards::ImageService.new(card)
      service.call

      render json: service.card.as_json
    end

    def update
      card = Card.find(params[:id])

      card.update!(card_params)

      render json: card.as_json
    end

    private

    def card_params
      params.require(:card).permit(:image, :body)
    end
  end
end
