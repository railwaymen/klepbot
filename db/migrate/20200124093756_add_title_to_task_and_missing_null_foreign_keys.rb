class AddTitleToTaskAndMissingNullForeignKeys < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :title, :string, null: false

    change_column_null :tasks, :contact_id, false
    change_column_null :tasks, :user_id, false
    change_column_null :tasks, :created_by_id, false
  end
end
