class AddSignatureToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :signature, :string
  end
end
