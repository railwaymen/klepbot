# frozen_string_literal: true

module Api
  class StatsController < BaseController
    def period_users_gain
      render json: PeriodUserContactsGainQuery.new(
        period,
        from: from,
        to: to,
        user_ids: [params[:user_id]]
      ).call.as_json
    end

    def period_events_gain
      render json: PeriodEventsContactsQuery.new(
        period,
        from: from,
        to: to,
        event_ids: [params[:event_id]]
      ).call.as_json
    end

    private

    def period
      params[:period].presence_in(%w[month day year]) || 'month'
    end

    def from
      params[:from].present? ? Time.zone.parse(params[:from]) : Time.current - 12.months
    end

    def to
      params[:to].present? ? Time.zone.parse(params[:to]) : Time.current
    end
  end
end
