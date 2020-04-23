# frozen_string_literal: true

module Api
  class EmailsController < BaseController
    def create
      authorized = Gmail::AuthorizeService.new(current_user).valid?

      if authorized
        email = current_user.emails.create!(email_params)
        email.gmail_send

        render json: email.as_json
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    def gmail_connected
      service = Gmail::AuthorizeService.new(current_user)

      render json: { gmail_connected: service.valid? }
    end

    def gmail_grant
      service = Gmail::AuthorizeService.new(current_user)

      response = service.grant!(params[:code])

      if response
        render json: {}, status: :ok
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
