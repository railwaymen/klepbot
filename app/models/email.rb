# frozen_string_literal: true

class Email < ApplicationRecord
  validates :to, :subject, :body, presence: true

  belongs_to :user
end
