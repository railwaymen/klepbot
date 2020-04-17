# frozen_string_literal: true

module Hubspot
  class ContactForm
    def initialize(contact)
      @contact = contact
    end

    def save
      @contact.save

      hubspot_contact = @contact.hubspot
      hubspot_contact.assign_attributes(@contact.hubspot_hash)
      hubspot_contact.save
      @contact.update(hubspot_id: hubspot_contact.vid)
    rescue Hubspot::ContactsQuery::RequestError, e
      errors.add(:hubspot, e)
    end
  end
end
