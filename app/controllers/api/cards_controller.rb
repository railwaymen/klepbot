# frozen_string_literal: true

module Api
  class CardsController < BaseController
    def index
      cards = Card.order(created_at: :desc)

      render json: cards.as_json
    end

    def show
      card = Card.find(params[:id])

      render json: card.as_json
    end

    def create
      card = Card.new(card_params.merge(image: base64_to_attached_file(image_params)))

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

    def base64_to_attached_file(params)
      decoded_base64 = Base64.decode64(params[:image])
      file = Tempfile.new('filename.jpg', encoding: 'ascii-8bit')
      file.write(decoded_base64)
      file.rewind

      ActionDispatch::Http::UploadedFile.new(tempfile: file, filename: '')
    end

    def image_params
      params.require(:card).permit(:image)
    end

    def card_params
      params.require(:card).permit(:body, :first_name, :last_name)
    end
  end
end
