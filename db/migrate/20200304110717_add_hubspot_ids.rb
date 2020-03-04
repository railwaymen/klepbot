class AddHubspotIds < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :hubspot_id, :string
    add_column :contacts, :hubspot_id, :string
  end
end
