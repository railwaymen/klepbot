# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  private

  def set_in_timezone(time, zone)
    Time.use_zone(zone) { time.to_datetime.change(offset: Time.zone.now.strftime("%z")) }
  end
end
