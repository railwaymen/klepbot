class CreateTaskTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :task_types do |t|
      t.string :name, null: false
      t.string :color, null: false

      t.timestamps
    end
  end
end
