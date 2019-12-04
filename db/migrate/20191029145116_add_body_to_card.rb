class AddBodyToCard < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :body, :text
  end
end
