class Task < ApplicationRecord
  belongs_to :user
  belongs_to :contact
  has_many :notifications
end
