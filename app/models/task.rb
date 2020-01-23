# frozen_string_literal: true

class Task < ApplicationRecord
  validates :user_id, :contact_id, :description, :send_at, :created_by_id, presence: true

  belongs_to :user
  belongs_to :contact
end
