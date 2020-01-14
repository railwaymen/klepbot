# frozen_string_literal: true

module Api
  class ContactsController < BaseController
    def index
      scope = Contact.order(created_at: :desc).includes(:event, :status)

      @contacts = Contacts::SearchQuery.new(scope, params[:query]).().page(params[:page] || 1)
    end

    def show
      @contact = Contact.find(params[:id])
    end

    def create
      contact = Contact.new(contact_params.merge(user_id: current_user.id, touched_id: current_user.id))

      if contact.save!
        render json: contact.as_json
      else
        render json: contact.errors.messages.as_json, status: :unprocessable_entity
      end
    end

    def update
      @contact = Contact.find(params[:id])

      if !@contact.update_with_action(contact_params)
        render json: @contact.errors.messages.as_json, status: :unprocessable_entity
      end
    end

    private

    def contact_params
      params.require(:contact).permit(
        :first_name,
        :last_name,
        :group,
        :category,
        :email,
        :contact_status_id,
        :contact_event_id
      )
    end
  end
end
