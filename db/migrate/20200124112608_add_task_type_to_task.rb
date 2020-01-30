class AddTaskTypeToTask < ActiveRecord::Migration[6.0]
  def change
    change_table :tasks do |t|
      t.references :task_type, null: false, foreign_key: true
    end
  end
end
