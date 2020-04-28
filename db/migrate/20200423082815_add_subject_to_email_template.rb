class AddSubjectToEmailTemplate < ActiveRecord::Migration[6.0]
  def change
    add_column :email_templates, :subject, :string, null: false
  end
end
