class AddForeignKeysToContacts < ActiveRecord::Migration[6.0]
  def change
    remove_column :contacts, :status, :string
    remove_column :contacts, :event, :string

    change_table :contacts do |t|
      t.references :contact_status, null: false, foreign_key: true
      t.references :contact_event, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :touched, foreign_key: { to_table: :users }
    end

    remove_column :contact_actions, :status, :string
    remove_column :contact_actions, :event, :string

    change_table :contact_actions do |t|
      t.references :contact_status, null: false, foreign_key: true
      t.references :contact_event, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :touched, foreign_key: { to_table: :users }
    end
  end
end
