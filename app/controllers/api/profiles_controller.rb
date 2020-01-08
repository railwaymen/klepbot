# frozen_string_literal: true

module Api
  class ProfilesController < BaseController
    def show
      @user = current_user
    end

    def update
      if current_user.update(user_params)
        render json: current_user.as_json
      else
        render json: current_user.errors.as_json
      end
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :avatar)
    end
  end
end