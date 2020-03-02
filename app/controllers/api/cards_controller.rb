# frozen_string_literal: true

module Api
  class CardsController < BaseController
    def index
      cards = Card.order(created_at: :desc)

      render json: cards.as_json
    end

    def show
      @card = Card.find(params[:id])

      respond_with @card
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
      params.require(:card).permit(:body, :first_name, :last_name, :image)
    end
  end
end
