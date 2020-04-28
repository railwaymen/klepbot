class AddGmailSignatureToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :gmail_signature, :text
  end
end
