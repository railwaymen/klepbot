# frozen_string_literal: true

FactoryBot.define do
  factory :card do
    image do
      Rack::Test::UploadedFile.new(Rails.root.join('spec', 'fixtures', 'image.png'), 'image/png')
    end
  end
end
