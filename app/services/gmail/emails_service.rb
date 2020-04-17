# frozen_string_literal: true

module Gmail
  class EmailsService
    EmailList = Struct.new(:id, :thread_id)

    def initialize(user)
      @user = user
    end

    def find(id)
      response = gmail_service.get(
        "users/me/messages/#{id}",
        token: token,
        params: { format: :metadata }
      )

      return unless response.code == 200

      Email.new(response.parsed_response.transform_keys(&:underscore.to_proc >> :to_sym.to_proc))
    end

    def all
      response = gmail_service.get(
        'users/me/messages',
        token: token
      )

      return [] unless response.code == 200

      response.parsed_response['messages'].map { |record| EmailList.new(*record.values) }
    end

    private

    def token
      AuthorizeService.new(@user).token
    end

    def gmail_service
      @gmail_service ||= ApiService.new(:gmail)
    end
  end
end
