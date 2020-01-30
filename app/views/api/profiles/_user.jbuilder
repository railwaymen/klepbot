json.id user.id
json.first_name user.first_name
json.last_name user.last_name
json.email user.email
json.signature user.signature
json.avatar_url user.avatar.attached? ? url_for(user.avatar) : ''
json.report do
  json.extract!(
    report,
    :counts,
    :id,
    :name,
    :periods,
    :color
  )
end
