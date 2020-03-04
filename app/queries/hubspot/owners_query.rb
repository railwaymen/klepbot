# frozen_string_literal: true

module Hubspot
  class OwnersQuery
    def self.find(id)
      return unless id

      record = ApiService.api_get("owners/v2/owners/#{id}")

      raise record['message'] if record&.dig('status') == 'error'

      initialize_record(record)
    end

    def self.find_by_email(email)
      record = ApiService.api_get("owners/v2/owners", params: { email: email }).first

      raise record['message'] if record&.dig('status') == 'error'

      initialize_record(record)
    end

    def self.all
      ApiService.api_get('owners/v2/owners').map(&method(:initialize_record))
    end

    def self.initialize_record(record)
      return unless record

      Owner.new(
        portal_id: record['portalId'],
        owner_id: record['ownerId'],
        first_name: record['firstName'],
        last_name: record['lastName'],
        email: record['email']
      )
    end
  end
end
