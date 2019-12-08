# frozen_string_literal: true

module Api
  class ContactStatusesController < BaseController
    def index
      render json: ContactStatus.all.as_json
    end
  end
end
