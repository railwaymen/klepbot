# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def hubspot_save
    klass = "Hubspot::#{self.class.name}"
    klass.constantize.create!(self.attributes.symbolize_keys)
  end

  # def hubspot
  #   klass = "Hubspot::#{self.class.name}"

  #   klass.constantize(self.attributes.symbolize_keys)

  #   # if self.hubspot_id.present?
  #   #   klass.find(params[:id])
  #   # end
  #   # .find(self.hubspot_id)
  # end
end
