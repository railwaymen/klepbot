# frozen_string_literal: true

module ApplicationHelper
  IMAGE_SIZE = 250

  def url_for_variant
    variant_path = '/storage/va/ri/' + image.variant(resize: IMAGE_SIZE).key

    Rails.application.credentials.fetch(Rails.env.to_sym)[:host] + variant_path
  end
end
