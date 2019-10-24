# frozen_string_literal: true

module Api
  class SessionsController < Devise::SessionsController
    respond_to :json
    skip_before_action :verify_authenticity_token

    def create
      self.resource = warden.authenticate(scope: :user)

      if resource
        render json: {
          id: resource.id,
          email: resource.email,
          token: JwtService.encode(payload: { id: resource.id })
        }
      else
        render json: { errors: 'invalid_email_or_password' }, status: :unprocessable_entity
      end
    end
  end
end
