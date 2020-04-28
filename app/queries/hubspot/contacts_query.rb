# frozen_string_literal: true

module Hubspot
  class ContactsQuery
    class RequestError < StandardError; end

    def self.find_by_email(email)
      record = ApiService.api_get("contacts/v1/contact/email/#{email}/profile")

      initialize_contact(record&.deep_symbolize_keys) if record
    end

    def self.find(vid)
      record = ApiService.api_get("contacts/v1/contact/vid/#{vid}/profile")

      raise RequestError, record['message'] if record.dig('status', 'error').present?

      initialize_contact(record.deep_symbolize_keys)
    end

    def self.search(query)
      ApiService.api_get('contacts/v1/search/query', q: query)
                .map(&:deep_symbolize_keys.to_proc >> Contact.method(:new))
    end

    def self.all
      ApiService.api_get('contacts/v1/lists/all/contacts/all')['contacts']
                .map(&:deep_symbolize_keys.to_proc >> Contact.method(:new))
    end

    def self.create(properties)
      record = ApiService.api_post('contacts/v1/contact',
                                   properties: properties)

      raise RequestError, record['message'] if record&.dig('status') == 'error'

      record['vid']
    end

    def self.update(vid, properties)
      record = ApiService.api_put("contacts/v1/contact/vid/#{vid}/profile",
                                  properties: properties)

      raise RequestError, record['message'] if record&.dig('status') == 'error'
    end

    def self.initialize_contact(attributes)
      properties = attributes[:properties]

      Contact.new(
        vid: attributes[:vid],
        first_name: properties[:firstname][:value],
        last_name: properties[:lastname][:value],
        email: properties[:email][:value],
        phone: properties.dig(:phone, :value),
        owner_id: properties.dig(:hubspot_owner_id, :value),
        lifecycle_stage: properties.dig(:lifecyclestage, :value),
        status: properties.dig(:hs_marketable_status, :value)
      )
    end
  end
end
