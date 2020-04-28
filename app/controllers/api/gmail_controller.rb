# frozen_string_literal: true

module Api
  class GmailController < BaseController
    def update_signature
      gmail_signature = Gmail::SettingsService.new(current_user).signatures&.find(&:is_primary)&.signature

      current_user.update(gmail_signature: gmail_signature)

      render json: { gmail_signature: gmail_signature }
    end

    def connected
      render json: { gmail_connected: current_user.gmail.valid? }
    end

    def grant
      return render json: { connected: true } if current_user.gmail.valid?

      current_user.gmail.grant!(params[:code])

      if current_user.gmail.valid?
        render json: { connected: true }
      else
        render json: { connected: false }
      end
    end
  end
end
