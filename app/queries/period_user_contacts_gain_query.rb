# frozen_string_literal: true

class PeriodUserContactsGainQuery
  class Record
    attr_reader :counts, :user_id, :user_name, :periods

    def initialize(counts:, user_id:, user_name:, periods:, period_name:)
      @counts = JSON.parse(counts)
      @user_id = user_id
      @user_name = user_name
      @periods = JSON.parse(periods).map(&Time.zone.method(:parse) >> period_name.to_sym.to_proc)
    end
  end

  def initialize(period = 'month', from: Time.current - 12.months, to: Time.current)
    @period = period.presence_in(['day', 'month', 'year'])
    @from = from
    @to = to + 1.send(period)
  end

  def call
    ActiveRecord::Base
      .connection
      .execute(raw)
      .map(&:symbolize_keys.to_proc >> Record.method(:new))
  end

  private

  def raw_series
    "
      SELECT dates_series FROM generate_series(
        date_trunc('#{@period}', '#{@from}'::date),
        date_trunc('#{@period}', '#{@to}'::date) - '1 #{@period}'::interval,
        '1 #{@period}'
      ) dates_series
    "
  end

  def raw
    "
      SELECT
        users.id AS user_id,
        users.email || ' ' || users.email AS user_name,
        json_agg(stats.count) AS counts,
        json_agg(stats.period) AS periods,
        '#{@period}' AS period_name
      FROM (
        SELECT
          COUNT(contacts.*) FILTER (WHERE date_trunc('#{@period}', contacts.created_at) = dates.dates_series),
          users.id AS user_id,
          dates.dates_series AS period
        FROM users
        LEFT JOIN contacts ON users.id = contacts.user_id
        cross JOIN (
          #{raw_series}
        ) dates
        GROUP BY users.id, dates.dates_series
      ) stats
      LEFT JOIN users ON users.id = stats.user_id
      GROUP BY users.id
    "
  end
end

