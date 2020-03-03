# frozen_string_literal: true

module Hubspot
  class Owner < Model
    attr_accessor :portal_id, :id, :first_name, :last_name, :email

    def initialize(portalId:, ownerId:, firstName:, lastName:, email:, **)
      @portal_id = portalId
      @id = ownerId
      @first_name = firstName
      @last_name = lastName
      @email = email
    end
  end
end
