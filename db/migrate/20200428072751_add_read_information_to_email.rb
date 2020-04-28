class AddReadInformationToEmail < ActiveRecord::Migration[6.0]
  def change
    add_column :emails, :read_at, :datetime
    add_column :emails, :read_token, :string
  end
end
