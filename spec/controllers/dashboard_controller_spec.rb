# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DashboardController, type: :controller do
  describe 'show' do
    context 'when authorized user' do
      it 'correctly render the page' do
        sign_in(FactoryBot.create(:user))

        get :show

        expect(response).to render_template(:show)
      end
    end

    context 'when unauthorized' do
      it 'redirects to new user session path' do
        get :show

        expect(response).to redirect_to new_user_session_path
      end
    end
  end
end
