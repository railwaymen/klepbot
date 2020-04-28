# frozen_string_literal: true

module Gmail
  class AuthorizeService
    def initialize(user)
      @user = user
    end

    def expired?
      return unless @user.google_auth_token_expire_at

      Time.current > @user.google_auth_token_expire_at
    end

    def valid?
      token.present?
    end

    def grant!(code)
      response = oauth_service.post(
        'token',
        token: nil,
        content_type: 'application/x-www-form-urlencoded',
        query: {
          client_id: ApiService::CLIENT_ID,
          client_secret: ApiService::CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: ApiService::REDIRECT
        }
      )

      return response unless response.code == 200

      create!(
        token: response.parsed_response['access_token'],
        refresh_token: response.parsed_response['refresh_token'],
        expires_in: response.parsed_response['expires_in']
      )
    end

    def refresh!
      response = oauth_service.post(
        'token',
        content_type: 'application/x-www-form-urlencoded',
        token: nil,
        query: {
          client_id: ApiService::CLIENT_ID,
          client_secret: ApiService::CLIENT_SECRET,
          refresh_token: @user.google_refresh_token,
          grant_type: 'refresh_token'
        }
      )

      return response unless response.code == 200

      create!(
        token: response.parsed_response['access_token'],
        refresh_token: response.parsed_response['refresh_token'],
        expires_in: response.parsed_response['expires_in']
      )

      response.parsed_response['access_token']
    end

    def token
      return refresh! if expired?

      @user.google_auth_token
    end

    def create!(token:, refresh_token: nil, expires_in:)
      @user.update!(
        google_auth_token: token,
        google_auth_token_expire_at: Time.current + expires_in.seconds,
        ** refresh_token ? { google_refresh_token: refresh_token } : {}
      )
    end

    private

    def oauth_service
      @oauth_service ||= ApiService.new(:oauth)
    end
  end
end
