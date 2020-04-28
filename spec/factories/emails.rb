# frozen_string_literal: true

FactoryBot.define do
  factory :email do
    user { nil }
    to { 'MyString' }
    subject { 'MyString' }
    body { 'MyString' }
    google_id { 'MyString' }
  end
end
