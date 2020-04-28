json.id email.id
json.contact_id email.contact_id
json.user_id email.user_id
json.subject email.subject
json.body email.body
json.google_id email.google_id
json.created_at parse_time(email.created_at)
json.updated_at parse_time(email.updated_at)

json.labels email.labels
json.read_at parse_time(email.read_at)

json.user do
  json.partial! 'api/users/user', locals: { user: email.user }
end
