class ContactAndCardPhoneNumbers < ActiveRecord::Migration[6.0]
  def self.up
    add_column :cards, :phones, :string, array: true, default: []
    add_column :contacts, :phone, :string
    add_column :contact_actions, :phone, :string
    add_column :contact_actions, :hubspot_id, :string

    Card.find_each do |card|
      card.update(phones: card.phone_numbers&.split(','))
    end

    remove_column :cards, :phone_numbers
  end

  def self.down
    add_column :cards, :phone_numbers, :string

    Card.find_each do |card|
      card.update(phone_numbers: card.phones&.join(','))
    end

    remove_column :cards, :phones
    remove_column :contacts, :phone, :string
    remove_column :contact_actions, :phone, :string
    remove_column :contact_actions, :hubspot_id, :string
  end
end
