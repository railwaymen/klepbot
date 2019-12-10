json.extract!(
  @contact_action,
  :id,
  :first_name,
  :last_name,
  :group,
  :category,
  :email,
  :contact_status_id,
  :contact_event_id,
  :action_type,
  :email_body
)

json.created_at @contact_action.created_at.strftime('%H:%M %d-%m-%Y')

json.event do
  json.extract!(
    @contact_action.event,
    :id,
    :color,
    :name
  )
end

json.status do
  json.extract!(
    @contact_action.status,
    :id,
    :color,
    :name
  )
end

