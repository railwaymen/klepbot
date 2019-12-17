# frozen_string_literal: true

module Api
  class StatsController < BaseController
    def period_users_gain
      render json: PeriodUserContactsGainQuery.new(
        params[:period],
        from: params[:from],
        to: params[:to]
      ).call.as_json
    end
  end
end
