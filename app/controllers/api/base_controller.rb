# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    before_action :authenticate_user!
  end
end