# frozen_string_literal: true

class Email < ApplicationRecord
  validates :to, :subject, :body, presence: true

  belongs_to :user

  def gmail_send
    return if google_id.present?

    gmail = Gmail::ComposeService.new(user, self).with_signature.send

    update!(google_id: gmail.id)
  end
end
