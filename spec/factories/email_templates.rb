# frozen_string_literal: true

FactoryBot.define do
  factory :email_template do
    name { 'Template' }
    body { 'Body' }
  end
end
