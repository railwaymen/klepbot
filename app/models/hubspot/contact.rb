# frozen_string_literal: true

module Hubspot
  class Contact < Model
    attr_accessor :vid, :first_name, :last_name, :email, :phone, :owner_id, :lifecycle_stage, :status

    def initialize(vid: nil, first_name:, last_name:, email:, phone: nil, owner_id: nil, lifecycle_stage: nil, status: nil)
      @vid = vid
      @first_name = first_name
      @last_name = last_name
      @email = email
      @phone = phone
      @owner_id = owner_id
      @lifecycle_stage = lifecycle_stage
      @status = status
    end

    def save
      vid.present? ? update : create
    end

    def owner
      @owner ||= OwnersQuery.find(owner_id)
    end

    private

    def to_attributes
      [
        { property: :email, value: @email },
        { property: :firstname, value: @first_name },
        { property: :lastname, value: @last_name },
        { property: :hubspot_owner_id, value: @owner_id }
      ]
    end

    def create
      saved_vid = ContactsQuery.create(to_attributes)

      assign_attributes(vid: saved_vid)
    end

    def update
      ContactsQuery.update(vid, to_attributes)
    end
  end
end
