# frozen_string_literal: true

module Api
  class UsersController < BaseController
    def index
      render json: User.all.as_json
    end
  end
end
