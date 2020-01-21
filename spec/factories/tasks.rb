FactoryBot.define do
  factory :task do
    user { nil }
    description { "MyText" }
    send_at { "2020-01-21 12:31:22" }
  end
end
