# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :validatable

  has_many :contacts
  has_many :tasks
  has_many :notifications
  has_many :emails
  has_many :touched_contacts, class_name: 'Contact', foreign_key: :touched_id
  has_one_attached :avatar

  def hubspot
    Hubspot::OwnersQuery.find(hubspot_id) || Hubspot::OwnersQuery.find_by_email(email)
  end

  def gmail
    @gmail ||= Gmail::AuthorizeService.new(self)
  end
end
