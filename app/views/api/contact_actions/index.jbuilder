json.array! @contact_actions do |contact_action|
  json.extract!(
    contact_action,
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
      contact_action.event,
      :id,
      :color,
      :name
    )
  end

  json.status do
    json.extract!(
      contact_action.status,
      :id,
      :color,
      :name
    )
  end
end
