# frozen_string_literal: true

module Api
  class EmailsController < BaseController
    def index
      @emails = Contact.find(params[:contact_id]).emails.includes(:user).order(created_at: :desc)
    end

    def show
      @email = Contact.find(params[:contact_id]).emails.find(params[:id])
    end

    def create
      contact = Contact.find(params[:contact_id])
      @email = contact.emails.build(
        email_params.merge(
          user_id: current_user.id,
          read_token: SecureRandom.uuid
        )
      )

      if current_user.gmail.valid? && @email.save
        @email.gmail_send
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    private

    def email_params
      params.require(:email).permit(:to, :subject, :body)
    end
  end
end
