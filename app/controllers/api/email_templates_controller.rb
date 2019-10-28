# frozen_string_literal: true

module Api
  class EmailTemplatesController < BaseController
    def index
      render json: EmailTemplate.all.as_json
    end
  end
end
