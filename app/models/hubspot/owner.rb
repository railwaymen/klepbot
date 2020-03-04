# frozen_string_literal: true

module Hubspot
  class Owner < Model
    attr_accessor :portal_id, :id, :first_name, :last_name, :email

    def initialize(portal_id:, owner_id:, first_name:, last_name:, email:)
      @portal_id = portal_id
      @id = owner_id
      @first_name = first_name
      @last_name = last_name
      @email = email
    end
  end
end
