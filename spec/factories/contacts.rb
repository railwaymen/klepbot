# frozen_string_literal: true

FactoryBot.define do
  factory :contact do
    first_name { 'MyString' }
    last_name { 'MyString' }
    email { 'MyString' }
    category { 'MyString' }
    group { 'MyString' }
    user
    touched { user }
    event { FactoryBot.create(:contact_event) }
    status { FactoryBot.create(:contact_status) }
  end
end
