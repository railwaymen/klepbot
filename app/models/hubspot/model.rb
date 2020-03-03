# frozen_string_literal: true

module Hubspot
  class Model
    def assign_attributes(attributes)
      attributes.each do |key, value|
        self.public_send(:"#{key}=", value)
      end

      self
    end
  end
end
