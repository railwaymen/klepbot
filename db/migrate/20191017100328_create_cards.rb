class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :first_name
      t.string :last_name
      t.text :metadata
      t.string :email
      t.string :company_name
      t.string :phone_numbers
      t.string :websites

      t.timestamps
    end
  end
end
