# frozen_string_literal: true

module Api
  class CardsController < BaseController
    def create
      @card = Card.new(card_params)

      if @card.save
        Cards::ImageService(@card).call
      else
        render json: @card.error.messages
      end
    end

    private

    def card_params
      params.require(:card).permit(:image)
    end
  end
end
