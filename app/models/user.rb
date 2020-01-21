# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :validatable

  has_many :contacts
  has_many :tasks
  has_many :touched_contacts, class_name: 'Contact', foreign_key: :touched_id
  has_one_attached :avatar
end
