# frozen_string_literal: true

module Gmail
  class SettingsService
    Signature = Struct.new(
      :send_as_email,
      :display_name,
      :reply_to_address,
      :signature,
      :is_primary,
      :is_default
    )

    def initialize(user)
      @user = user
    end

    def signatures
      response = gmail_service.get(
        'users/me/settings/sendAs',
        token: @user.gmail.token
      )

      return [] unless response.code == 200

      response['sendAs'].map { |send_as| Signature.new(*send_as.values) }
    end

    private

    def gmail_service
      @gmail_service ||= ApiService.new(:gmail)
    end
  end
end
