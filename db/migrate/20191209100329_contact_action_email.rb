class ContactActionEmail < ActiveRecord::Migration[6.0]
  def change
    add_column :contact_actions, :email_body, :text
    add_column :contact_actions, :action_type, :string, default: 'update'
  end
end
