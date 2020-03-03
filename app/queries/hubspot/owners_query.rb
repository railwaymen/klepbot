# frozen_string_literal: true

module Hubspot
  class OwnersQuery
    def self.find(id)
      record = ApiService.api_get("owners/v2/owners/#{id}")

      raise record['message'] if record.dig('status', 'error').present?

      Owner.new(record.symbolize_keys)
    end

    def self.all
      ApiService.api_get('owners/v2/owners')
    end
  end
end
