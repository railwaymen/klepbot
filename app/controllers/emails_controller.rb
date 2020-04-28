# frozen_string_literal: true

class EmailsController < ApplicationController
  def track
    token, id = params[:id].gsub('.jpg', '').split('$')

    email = Email.where(read_at: nil).find_by(
      read_token: token,
      id: id
    )

    email.update(read_at: Time.current) if email

    send_file(
      'public/temp.png',
      type: 'image/png',
      disposition: 'inline'
    )
  end
end
