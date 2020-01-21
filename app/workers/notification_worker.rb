# frozen_string_literal: true

class NotificationWorker
  include Sidekiq::Worker

  def perform(id)
    task = Task.find(id)

    task.notifications.create!(
      description: task.description,
      user_id: task.user_id,
      contact_id: task.contact_id
    )
  end
end