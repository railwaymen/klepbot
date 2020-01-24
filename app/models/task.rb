class Task < ApplicationRecord
  validates :user_id, :title, :description, :send_at, :created_by_id, presence: true

  belongs_to :user
  belongs_to :contact
  has_many :notifications
end
