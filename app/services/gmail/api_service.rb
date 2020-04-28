# frozen_string_literal: true

module Gmail
  class ApiService
    SCOPES = {
      gmail: 'https://www.googleapis.com/gmail/v1/',
      oauth: 'https://oauth2.googleapis.com/'
    }.freeze

    CLIENT_ID = Rails.application.credentials.google.fetch(:client_id)
    CLIENT_SECRET = Rails.application.credentials.google.fetch(:client_secret)
    REDIRECT = Rails.application.credentials.google.fetch(:redirect)

    def initialize(scope)
      @api_path = SCOPES[scope.to_sym || :gmail]
    end

    def get(path, params: {}, token:)
      url = "#{@api_path}#{path}"

      Rails.logger.info("HTTP request #{url} with params #{params.inspect}")

      HTTParty.get(
        url,
        query: params,
        headers: {
          'Authorization': "Bearer #{token}",
          'Content-Type': 'application/json'
        }
      )
    end

    def post(path, params: {}, query: {}, token:, content_type: 'application/json')
      url = "#{@api_path}#{path}"

      Rails.logger.info("HTTP request #{url} with params #{params.inspect}")

      HTTParty.post(
        url,
        query: query,
        body: params.to_json,
        headers: {
          'Authorization': "Bearer #{token}",
          'Content-Type': content_type
        }
      )
    end
  end
end
