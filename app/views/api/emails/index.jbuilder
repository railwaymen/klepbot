# frozen_string_literal: true

json.array! @emails do |email|
  json.partial! 'email', locals: { email: email }
end
