# frozen_string_literal: true

module ApplicationHelper
  def sandbox_environment?
    Rails.env.uat?
  end
end
