# frozen_string_literal: true

module ApplicationHelper
  def parse_time(timestamp)
    return unless timestamp

    return "#{time_ago_in_words(timestamp)} ago" if Time.current - timestamp < 14400

    timestamp.strftime('%H:%m %d-%m-%y')
  end
end
