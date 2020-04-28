class AddContactToEmail < ActiveRecord::Migration[6.0]
  def change
    add_reference :emails, :contact, null: false, foreign_key: true
  end
end
