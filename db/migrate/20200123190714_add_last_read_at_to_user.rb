class AddLastReadAtToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :notifications_last_read_at, :datetime, default: -> { 'NOW()' }
  end
end
