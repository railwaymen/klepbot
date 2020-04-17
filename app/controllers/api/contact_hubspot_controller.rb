# frozen_string_literal: true

module Api
  class ContactHubspotController < BaseController
    def show
      contact = Contact.find(params[:contact_id])

      render json: contact.hubspot.as_json
    end

    def create
      contact = Contact.find(params[:contact_id])
      contact.hubspot_save

      render json: contact.hubspot.as_json
    end
  end
end
