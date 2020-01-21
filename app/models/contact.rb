class Contact < ApplicationRecord
  has_many :actions, class_name: 'ContactAction', dependent: :destroy
  belongs_to :status, class_name: 'ContactStatus', foreign_key: :contact_status_id
  belongs_to :event, class_name: 'ContactEvent', foreign_key: :contact_event_id
  belongs_to :user
  has_many :tasks
  belongs_to :touched, class_name: 'User', foreign_key: :touched_id

  def update_with_action(params)
    update(params)

    action_attributes = attributes
    ['id', 'created_at', 'updated_at'].map(&action_attributes.method(:delete))
    action_attributes['action_type'] = :updated

    actions.create!(action_attributes)
  end
end
