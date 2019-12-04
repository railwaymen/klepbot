# frozen_string_literal: true

FactoryBot.define do
  factory :email_template do
    name { 'MyString' }
    body { 'MyText' }
  end
end
