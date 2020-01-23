# frozen_string_literal: true

module Api
  class NotificationsController < BaseController
    def index
      @notifications = current_user
        .notifications
        .includes(:contact)
        .order(created_at: :desc)
        .limit(5)

      @notifications_count = current_user
        .notifications
        .where('created_at >= ?', current_user.notifications_last_read_at)
        .count
    end
  end
end
