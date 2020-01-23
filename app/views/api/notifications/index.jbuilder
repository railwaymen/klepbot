# frozen_string_literal: true

json.notifications do
    json.array! @notifications do |notification|
    json.id notification.id
    json.description notification.description
    json.contact_id notification.contact_id
    json.contact do
      json.id notification.contact.id
      json.first_name notification.contact.first_name
      json.last_name notification.contact.last_name
    end
  end
end

json.notifications_count @notifications_count
