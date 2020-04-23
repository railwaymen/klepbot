# frozen_string_literal: true

module Api
  class GmailController < BaseController
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
