# frozen_string_literal: true

class EmailTemplate < ApplicationRecord
  validates :name, :body, presence: true
end
