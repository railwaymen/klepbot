class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.references :task, null: false, foreign_key: true, null: false
      t.references :user, null: false, foreign_key: true, null: false
      t.references :contact, null: false, foreign_key: true, null: false

      t.timestamps
    end
  end
end
