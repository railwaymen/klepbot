# frozen_string_literal: true

module Gmail
  class ComposeService
    include HTTParty

    Email = Struct.new(:id, :thread_ids, :label_ids)

    def initialize(user, email)
      @user = user
      @email = email
    end

    def send_draft
      response = gmail_service.post(
        'users/me/drafts',
        params: { message: { raw: prepare_payload } },
        token: token
      )

      return unless response.code == 200

      Email.new(*response.parsed_response.values)
    end

    def send
      response = gmail_service.post(
        'users/me/messages/send',
        params: { raw: prepare_payload },
        token: token
      )

      return unless response.code == 200

      Email.new(*response.parsed_response.values)
    end

    private

    def gmail_service
      @gmail_service ||= ApiService.new(:gmail)
    end

    def token
      AuthorizeService.new(@user).token
    end

    def prepare_payload
      mail = Mail.new(
        from: @user.email,
        to: @email.to,
        subject: @email.subject,
        body: @email.body
      )

      Base64.urlsafe_encode64(mail.to_s).gsub(/\+/, '-').gsub(/\\/, '_')
    end
  end
end
