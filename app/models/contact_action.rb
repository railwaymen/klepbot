class ContactAction < ApplicationRecord
  belongs_to :contact
  belongs_to :status, class_name: 'ContactStatus', foreign_key: :contact_status_id
  belongs_to :event, class_name: 'ContactEvent', foreign_key: :contact_event_id
  belongs_to :user
  belongs_to :touched, class_name: 'User', foreign_key: :touched_id
end
