class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :contact, null: false, foreign_key: true
      t.references :created_by, foreign_key: { to_table: :users }
      t.text :description, null: false
      t.datetime :send_at, null: false

      t.timestamps
    end
  end
end
