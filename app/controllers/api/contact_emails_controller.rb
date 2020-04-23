# frozen_string_literal: true

module Api
  class ContactEmailsController < BaseController
    def index
      emails = Contact.find(params[:contact_id]).emails.as_json
    end

    def show
      email = Contact.find(params[:contact_id]).emails.find(params[:id]).as_json
    end
  end
end
