# frozen_string_literal: true

FactoryBot.define do
  factory :card do
    first_name { 'MyString' }
    last_name { 'MyString' }
    metadata { 'MyText' }
    email { 'MyString' }
    company_name { 'MyString' }
    phone_numbers { 'MyString' }
  end
end
