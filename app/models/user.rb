# frozen_string_literal: true

class User < ApplicationRecord
  validates :first_name, :last_name, :email, presence: true

  devise :database_authenticatable, :validatable

  has_many :contacts, dependent: :restrict_with_error
  has_many :tasks, dependent: :restrict_with_error
  has_many :touched_contacts,
           class_name: 'Contact',
           foreign_key: :touched_id,
           dependent: :restrict_with_error,
           inverse_of: :contact

  has_one_attached :avatar
end
