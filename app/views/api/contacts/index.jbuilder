# frozen_string_literal: true

json.array! @contacts do |contact|
  json.extract!(
    contact,
    :id,
    :first_name,
    :last_name,
    :group,
    :category,
    :email,
    :contact_status_id,
    :contact_event_id
  )

  json.event do
    json.extract!(
      contact.event,
      :id,
      :color,
      :name
    )
  end

  json.status do
    json.extract!(
      contact.status,
      :id,
      :color,
      :name
    )
  end
end
