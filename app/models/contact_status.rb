class ContactStatus < ApplicationRecord
  validates :name, :color, presence: true

  has_many :contacts, dependent: :restrict_with_error
end
