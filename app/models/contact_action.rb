# frozen_string_literal: true

class ContactAction < ApplicationRecord
  validates :contact_id, presence: true

  belongs_to :contact, inverse_of: :actions

  belongs_to :status,
             class_name: 'ContactStatus',
             foreign_key: :contact_status_id,
             inverse_of: :contacts
  belongs_to :event,
             class_name: 'ContactEvent',
             foreign_key: :contact_event_id,
             inverse_of: :contacts
  belongs_to :user
  belongs_to :touched,
             class_name: 'User',
             foreign_key: :touched_id,
             inverse_of: :contacts

  enum action_type: {
    created: 'created',
    updated: 'updated',
    email: 'email'
  }
end
