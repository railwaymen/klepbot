# frozen_string_literal: true

json.extract!(
  @contact,
  :id,
  :first_name,
  :last_name,
  :group,
  :category,
  :email,
  :contact_status_id,
  :contact_event_id
)

json.updated_at @contact.updated_at.strftime('%H:%M %d-%m-%Y')

json.event do
  json.extract!(
    @contact.event,
    :id,
    :color,
    :name
  )
end

json.status do
  json.extract!(
    @contact.status,
    :id,
    :color,
    :name
  )
end
