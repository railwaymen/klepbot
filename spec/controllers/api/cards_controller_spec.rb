# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  describe 'create' do
    context 'authneticate user' do
      it 'correctly create card' do
        sign_in(FactoryBot.create(:user))

        params = {
          card: {
            image: fixture_file_upload('image.png')
          }
        }

        mocked_service = double(Cards::ImageService)
        expect(mocked_service).to receive(:call).and_return(true)
        expect(mocked_service).to receive(:card).and_return(Card.new)

        expect(Cards::ImageService).to receive(:new).and_return(mocked_service)

        expect do
          post :create, params: params, format: :json
        end.to(change(Card, :count).by(1))
        expect(response.code).to eq '200'
      end
    end

    context 'guest' do
      it 'response with unauthneticate error' do
        post :create, params: { card: { image: 'test' } }, format: :json

        expect(response.code).to eq '401'
      end
    end
  end
end
