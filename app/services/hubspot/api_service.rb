# frozen_string_literal: true

module Hubspot
  class ApiService
    include HTTParty

    API_PATH = 'https://api.hubapi.com/'

    def self.api_get(path, params: {})
      response = get("#{API_PATH}#{path}", { query: { hapikey: API_KEY, **params }, format: :json })&.parsed_response
    end

    def self.api_post(path, params)
      post(
        "#{API_PATH}#{path}",
        { body: params.to_json, query: { hapikey: API_KEY }, format: :json }
      )
    end

    def self.api_put(path, params)
      post(
        "#{API_PATH}#{path}",
        { body: params.to_json, query: { hapikey: API_KEY }, format: :json }
      )&.parsed_response
    end
  end
end
