# frozen_string_literal: true

module Stats
  class DataRecord
    attr_reader :counts, :id, :name, :periods, :color

    def initialize(counts:, id:, name:, periods:, period_name:, color: nil)
      @counts = JSON.parse(counts)
      @id = id
      @name = name
      @color = color
      @periods = JSON
        .parse(periods)
        .map { |period| Time.zone.parse(period).strftime('%d-%b-%y') }
    end
  end
end
