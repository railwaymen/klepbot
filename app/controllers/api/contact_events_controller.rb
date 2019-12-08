# frozen_string_literal: true

module Api
  class ContactEventsController < BaseController
    def index
      render json: ContactEvent.all.as_json
    end
  end
end
