# frozen_string_literal: true

module Hubspot
  class Model
    class RecordError < StandardError; end

    def assign_attributes(attributes)
      attributes.each do |key, value|
        public_send(:"#{key}=", value)
      end

      self
    end
  end
end
