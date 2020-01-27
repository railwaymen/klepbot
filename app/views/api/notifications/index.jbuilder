# frozen_string_literal: true

json.notifications do
    json.array! @notifications do |notification|
    json.id notification.id
    json.title notification.task.title
    json.description notification.task.description
    json.contact_id notification.task.contact_id
    json.created_ago time_ago_in_words(notification.created_at)
    json.new_notification(current_user.notifications_last_read_at - 1.hour < notification.created_at)
    json.task_type do
      json.name notification.task.task_type.name
      json.color notification.task.task_type.color
    end
    json.contact do
      json.id notification.task.contact.id
      json.first_name notification.task.contact.first_name
      json.last_name notification.task.contact.last_name
    end
    json.user do
      json.id notification.user.id
      json.first_name notification.user.first_name
      json.last_name notification.user.last_name
      json.email notification.user.email
      json.signature notification.user.signature
      json.avatar_url notification.user.avatar.attached? ? url_for(notification.user.avatar) : ''
    end
  end
end

json.notifications_count @notifications_count
