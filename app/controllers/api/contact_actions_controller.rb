# frozen_string_literal: true

module Api
  class ContactActionsController < BaseController
    def index
      contact = Contact.find(params[:contact_id])

      @contact_actions = contact.actions.includes(:event, :status).order(created_at: :desc)
    end

    def create
      contact = Contact.find(params[:contact_id])

      copy_params = contact_action_params.merge({
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        contact_status_id: contact.contact_status_id,
        contact_event_id: contact.contact_event_id,
        user_id: contact.user_id,
        touched_id: current_user.id
      })

      @contact_action = contact.actions.create!(copy_params)
    end

    private

    def contact_action_params
      params.require(:contact_action).permit(
        :action_type,
        :email_body
      )
    end
  end
end
