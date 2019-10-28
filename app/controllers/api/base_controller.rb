# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    before_action :authenticate_user!
    skip_before_action :verify_authenticity_token
    respond_to :json
  end
end
