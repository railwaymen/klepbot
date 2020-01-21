# frozen_string_literal: true

module Api
  class NotificationsController < BaseController
    def index
      @notifications = current_user.notifications.includes(:contact).order(created_at: :desc).limit(5)
    end
  end
end