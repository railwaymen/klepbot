# frozen_string_literal: true

FactoryBot.define do
  factory :contact_action do
    contact
    reason { 'MyString' }
  end
end
