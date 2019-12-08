# frozen_string_literal: true

module Api
  class ContactActionsController < BaseController
    def index
      contact = Contact.find(params[:contact_id])

      @contact_actions = contact.actions.includes(:event, :status).order(created_at: :desc)
    end
  end
end
