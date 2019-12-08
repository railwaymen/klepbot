class CreateContactActions < ActiveRecord::Migration[6.0]
  def change
    create_table :contact_actions do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :category
      t.string :group
      t.string :status, default: 'first_contact'
      t.string :event

      t.references :contact, null: false, foreign_key: true
      t.string :reason

      t.timestamps
    end
  end
end
