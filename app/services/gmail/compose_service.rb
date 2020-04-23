# frozen_string_literal: true

module Gmail
  class ComposeService
    Email = Struct.new(:id, :thread_ids, :label_ids)

    def initialize(user, email)
      @user = user
      @email = email

      @signature
    end

    def with_signature
      @signature = SettingsService.new(@user).signatures.find { |s| s.is_primary }&.signature

      self
    end

    def send_draft
      response = gmail_service.post(
        'users/me/drafts',
        params: { message: { raw: prepare_payload } },
        token: @user.gmail.token
      )

      return unless response.code == 200

      Email.new(*response.parsed_response.values)
    end

    def send
      response = gmail_service.post(
        'users/me/messages/send',
        params: { raw: prepare_payload },
        token: @user.gmail.token
      )

      return unless response.code == 200

      Email.new(*response.parsed_response.values)
    end

    private

    def gmail_service
      @gmail_service ||= ApiService.new(:gmail)
    end

    def prepare_body
      return @email.body unless @signature.present?

      "#{@email.body}

      ---
      #{@signature}"
    end

    def prepare_payload
      body = prepare_body

      mail = Mail.new(
        from: @user.email,
        to: @email.to,
        subject: @email.subject
      ) do
        html_part do
          content_type 'text/html; charset=UTF-8'
          body body
        end
      end

      Base64.urlsafe_encode64(mail.to_s).gsub(/\+/, '-').gsub(/\\/, '_')
    end
  end
end
