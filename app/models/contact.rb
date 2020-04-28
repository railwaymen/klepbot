class Contact < ApplicationRecord
  has_many :actions, class_name: 'ContactAction', dependent: :destroy
  belongs_to :status, class_name: 'ContactStatus', foreign_key: :contact_status_id
  belongs_to :event, class_name: 'ContactEvent', foreign_key: :contact_event_id
  belongs_to :user
  has_many :tasks
  has_many :emails
  belongs_to :touched, class_name: 'User', foreign_key: :touched_id

  def update_with_action(params)
    update(params)

    action_attributes = attributes
    ['id', 'created_at', 'updated_at'].map(&action_attributes.method(:delete))
    action_attributes['action_type'] = :updated

    actions.create!(action_attributes)
  end

  def hubspot_save
    raise Hubspot::Model::RecordError, 'Already saved' if hubspot_id

    hubspot.save
    update(hubspot_id: hubspot.vid)
  end

  def hubspot
    @hubspot ||= begin
      return Hubspot::ContactsQuery.find(hubspot_id) if hubspot_id

      Hubspot::Contact.new(hubspot_hash)
    end
  end

  def hubspot_hash
    {
      first_name: first_name,
      last_name: last_name,
      email: email,
      owner_id: user.hubspot_id
    }
  end
end
