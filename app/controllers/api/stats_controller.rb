# frozen_string_literal: true

module Api
  class StatsController < BaseController
    def index
      query = StatsQuery.new(params[:period] || 'month')

      events = ContactEvent.all.map do |e|
        { :"#{e.name.downcase.gsub(' ', '_')}" => query.events(e.name) }
      end.reduce({}, :merge)

      statuses = ContactStatus.all.map do |e|
        { :"#{e.name.downcase.gsub(' ', '_')}" => query.statuses(e.name) }
      end.reduce({}, :merge)

      render json: {
        events: events,
        statuses: statuses
      }
    end
  end
end
