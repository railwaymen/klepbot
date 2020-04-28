class CreateEmails < ActiveRecord::Migration[6.0]
  def change
    create_table :emails do |t|
      t.references :user, null: false, foreign_key: true, null: false
      t.string :to, null: false
      t.string :subject, null: false
      t.string :body, null: false
      t.string :google_id

      t.timestamps
    end
  end
end
