# frozen_string_literal: true

class Email < ApplicationRecord
  validates :to, :subject, :body, presence: true

  belongs_to :user
  belongs_to :contact

  def gmail_send
    return if google_id.present?

    gmail = Gmail::ComposeService.new(user, self).with_signature.send

    update!(google_id: gmail.id)
  end

  def labels
    [label_read, label_delivered].compact
  end

  def label_read
    return 'read' if read_at.present?
  end

  def label_delivered
    return 'delivered' if google_id.present?
  end
end
