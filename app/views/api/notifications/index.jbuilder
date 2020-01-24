# frozen_string_literal: true

json.notifications do
    json.array! @notifications do |notification|
    json.id notification.id
    json.title notification.task.title
    json.description notification.task.description
    json.contact_id notification.task.contact_id
    json.contact do
      json.id notification.task.contact.id
      json.first_name notification.task.contact.first_name
      json.last_name notification.task.contact.last_name
    end
  end
end

json.notifications_count @notifications_count
