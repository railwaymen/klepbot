# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Cards::NamesService do
  describe 'names resolve' do
    it 'correctly assign most accuracy name from metadata' do
      metadata = '
        Fox Mulder
        Test
        Lorem ipsum
        Sample Name Third
        Lorem ipsum Lorem ipsum Lorem ipsum
      '

      email = 'fox.mulder@example.com'

      service = described_class.new(metadata, email)

      expect(service.names.join(' ')).to eq 'Fox Mulder'
    end
  end
end
