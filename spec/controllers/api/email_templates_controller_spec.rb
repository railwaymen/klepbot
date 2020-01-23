# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::EmailTemplatesController, type: :controller do
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

  describe 'show' do
    context 'authenticated user' do
      it 'correctly render the page' do
        sign_in(FactoryBot.create(:user))
        email_template = FactoryBot.create(:email_template)
        get :show, params: { id: email_template.id }, format: :json

        expect(response.code).to eq '200'
      end
    end

    context 'guest' do
      it 'correctly render the page' do
        get :show, params: { id: 1 }, format: :json

        expect(response.code).to eq '401'
      end
    end
  end

  describe 'create' do
    context 'authenticated user' do
      context 'params are valid' do
        it 'correctly render the page' do
          sign_in(FactoryBot.create(:user))
          params = { email_template: { name: 'template name', body: 'Body' } }

          expect do
            post :create, params: params, format: :json
          end.to change(EmailTemplate, :count).by(1)

          expect(response.code).to eq '200'
        end
      end

      context 'params not are valid' do
        it 'correctly render the page' do
          sign_in(FactoryBot.create(:user))
          expect do
            post :create, params: { email_template: { name: '', body: '' } }, format: :json
          end.to change(EmailTemplate, :count).by(0)

          expect(response.code).to eq '422'
        end
      end
    end

    context 'guest' do
      it 'correctly render the page' do
        post :create, params: { email_template: { name: '', body: '' } }, format: :json

        expect(response.code).to eq '401'
      end
    end
  end

  describe 'update' do
    context 'authenticated user' do
      context 'params are valid' do
        it 'correctly render the page' do
          sign_in(FactoryBot.create(:user))
          email_template = FactoryBot.create(:email_template, name: 'Test', body: 'Example')

          put :update, params: {
            email_template: {
              name: 'template name', body: 'Body'
            },
            id: email_template.id
          }, format: :json

          email_template.reload

          expect(email_template).to have_attributes(
            name: 'template name',
            body: 'Body'
          )

          expect(response.code).to eq '200'
        end
      end

      context 'params not are valid' do
        it 'correctly render the page' do
          sign_in(FactoryBot.create(:user))
          email_template = FactoryBot.create(:email_template, name: 'Test', body: 'Example')

          put :update, params: {
            email_template: {
              name: '', body: ''
            },
            id: email_template.id
          }, format: :json

          email_template.reload

          expect(email_template).not_to have_attributes(
            name: '',
            body: ''
          )

          expect(response.code).to eq '422'
        end
      end
    end

    context 'guest' do
      it 'correctly render the page' do
        post :create, params: { email_template: { name: '', body: '' } }, format: :json

        expect(response.code).to eq '401'
      end
    end
  end
end
