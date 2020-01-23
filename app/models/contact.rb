# frozen_string_literal: true

class Contact < ApplicationRecord
  has_many :actions, class_name: 'ContactAction', dependent: :destroy

  belongs_to :status,
             class_name: 'ContactStatus',
             foreign_key: :contact_status_id,
             inverse_of: :contacts

  belongs_to :event,
             class_name: 'ContactEvent',
             foreign_key: :contact_event_id,
             inverse_of: :contacts

  belongs_to :user

  has_many :tasks, dependent: :restrict_with_error
  belongs_to :touched,
             class_name: 'User',
             foreign_key: :touched_id
  #  inverse_of: :users

  def action_attributes
    contact.attributes.symbolize_keys.extract!(
      :first_name, :last_name, :email,
      :contact_status_id, :contact_event_id, :user_id
    )
  end

  def update_with_action(params)
    update(params)

    action_attributes = attributes
    %w[id created_at updated_at].map(&action_attributes.method(:delete))
    action_attributes['action_type'] = :updated

    actions.create!(action_attributes)
  end
end
