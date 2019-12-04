class AddPossibleNamesToCard < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :possible_names, :string, array: true, default: []
  end
end
