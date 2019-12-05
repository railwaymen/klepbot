# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Cards::ImageService do
  describe 'call' do
    it 'recognize from string data' do
      metadata = "
        example string with user@example.com data that contains
        www.somewebsite.com and otherwebside.com
        some test message and lorem ipsum
        123 331 552 number
        0 953 542 3513 get color
      "

      card = FactoryBot.create(:card, metadata: metadata)

      service = described_class.new(card)

      expect(Kernel).to receive(:system).and_return metadata

      service.call

      card.reload

      expect(card.email).to eq 'user@example.com'
      expect(card.websites).to eq 'example.com,www.somewebsite.com,otherwebside.com'
      expect(card.phone_numbers).to eq '123 331 552,0 953 542 3513'
    end
  end
end
