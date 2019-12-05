# frozen_string_literal: true

module Api
  class ContactsController < BaseController
    def index
      contacts = Contact.order(created_at: :desc).page(params[:page] || 1)

      render json: contacts.as_json
    end

    def show
      contact = Contact.find(params[:id])

      render json: contact.as_json
    end

    def create
      contact = Contact.new(contact_params)

      if contact.save
        render json: contact.as_json
      else
        render json: contact.errors.messages.as_json, status: :unprocessable_entity
      end
    end

    def update
      contact = Contact.find(params[:id])

      if contact.update(contact_params)
        render json: contact.as_json
      else
        render json: contact.errors.messages.as_json, status: :unprocessable_entity
      end
    end

    private

    def contact_params
      params.require(:contact).permit(:first_name, :last_name, :group, :category, :email)
    end
  end
end
