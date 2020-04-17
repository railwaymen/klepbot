class AddGoogleAuthenticateFieldsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :google_auth_token, :string
    add_column :users, :google_refresh_token, :string
    add_column :users, :google_auth_token_expire_at, :string
  end
end
