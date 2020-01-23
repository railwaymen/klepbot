# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ContactsController, type: :controller do
  describe 'index' do
    context 'as guest' do
      it 'render status unauthorized' do
        get :index, format: :json

        expect(response.code).to eq '401'
      end
    end

    context 'as logged user' do
      it 'render json collection' do
        sign_in(FactoryBot.create(:user))

        get :index, format: :json

        expect(response.code).to eq '200'
      end
    end
  end

  describe 'show' do
    context 'as guest' do
      it 'render status unauthorized' do
        get :show, params: { id: 1 }, format: :json

        expect(response.code).to eq '401'
      end
    end

    context 'as logged user' do
      it 'render contact informations' do
        user = FactoryBot.create(:user)
        contact = FactoryBot.create(:contact, user: user)
        sign_in(user)

        get :show, params: { id: contact.id }, format: :json

        expect(response.code).to eq '200'
      end
    end
  end

  describe 'create' do
    context 'as guest' do
      it 'render status unauthorized' do
        post :create, params: { contact: { first_name: 'test' } }, format: :json

        expect(response.code).to eq '401'
      end
    end

    context 'as logged user' do
      context 'with correct params' do
        it 'will create contact' do
          user = FactoryBot.create(:user)
          event = FactoryBot.create(:contact_event)
          status = FactoryBot.create(:contact_status)

          params = FactoryBot.attributes_for(
            :contact,
            user: user,
            contact_event_id: event.id,
            contact_status_id: status.id
          )

          sign_in(user)

          expect do
            post :create, params: { contact: params }, format: :json
          end.to change(Contact, :count).by(1)

          expect(response.code).to eq '200'
        end
      end

      context 'with incorrect params' do
        it 'won\'t create contact' do
          user = FactoryBot.create(:user)
          event = FactoryBot.create(:contact_event)
          status = FactoryBot.create(:contact_status)

          params = FactoryBot.attributes_for(
            :contact,
            user: user,
            contact_event_id: nil,
            contact_status_id: nil
          )

          sign_in(user)

          expect do
            post :create, params: { contact: params }, format: :json
          end.to change(Contact, :count).by(0)

          expect(response.code).to eq '422'
        end
      end
    end
  end

  describe 'update' do
    context 'as guest' do
      it 'render status unauthorized' do
        put :update, params: { id: 1, contact: { first_name: 'test' } }, format: :json

        expect(response.code).to eq '401'
      end
    end

    context 'as logged user' do
      context 'with correct params' do
        it 'will update contact' do
          user = FactoryBot.create(:user)
          contact = FactoryBot.create(:contact, user: user)

          params = {
            first_name: 'Fox',
            last_name: 'Mulder'
          }

          sign_in(user)

          put :update, params: { id: contact.id, contact: params }, format: :json

          expect(contact.reload).to have_attributes(params)

          expect(response.code).to eq '200'
        end
      end

      context 'with incorrect params' do
        it 'won\'t create contact' do
          user = FactoryBot.create(:user)
          event = FactoryBot.create(:contact_event)
          status = FactoryBot.create(:contact_status)

          params = FactoryBot.attributes_for(
            :contact,
            user: user,
            contact_event_id: nil,
            contact_status_id: nil
          )

          sign_in(user)

          expect do
            post :create, params: { contact: params }, format: :json
          end.to change(Contact, :count).by(0)

          expect(response.code).to eq '422'
        end
      end
    end
  end
end
