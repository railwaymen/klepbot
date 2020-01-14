# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  describe 'index' do
    context 'authenticated user' do
      it 'correctly render the page' do
        sign_in(FactoryBot.create(:user))
        get :index, format: :json

        expect(response.code).to eq '200'
      end
    end

    context 'guest' do
      it 'correctly render the page' do
        get :index, format: :json

        expect(response.code).to eq '401'
      end
    end
  end

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

  describe 'update' do
    context 'authneticate user' do
      it 'correctly create card' do
        sign_in(FactoryBot.create(:user))
        card = FactoryBot.create(:card, first_name: 'Joh', last_name: 'Doe')

        params = {
          card: {
            first_name: 'Fox',
            last_name: 'Mulder'
          },
          id: card.id
        }

        put :update, params: params, format: :json

        card.reload

        expect(card).to have_attributes(
          first_name: 'Fox',
          last_name: 'Mulder'
        )

        expect(response.code).to eq '200'
      end
    end

    context 'guest' do
      it 'response with unauthneticate error' do
        put :update, params: { card: { first_name: 'test' }, id: 1 }, format: :json

        expect(response.code).to eq '401'
      end
    end
  end
end
