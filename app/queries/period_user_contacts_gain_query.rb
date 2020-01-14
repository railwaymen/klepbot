# frozen_string_literal: true

class PeriodUserContactsGainQuery
  def initialize(period = 'month', from: Time.current - 12.months, to: Time.current, user_ids: [], strftime: '%d-%b-%y')
    @period = period
    @from = from + 1.send(period)
    @to = to + 1.send(period)
    @user_ids = user_ids.reject(&:blank?)
    @strftime = strftime
  end

  def call
    ActiveRecord::Base
      .connection
      .execute(raw)
      .map do |e|
        Stats::DataRecord.new(e.symbolize_keys.merge(strftime: @strftime))
      end
  end

  private

  def user_ids_where
    return '' if @user_ids.empty?

    "WHERE users.id IN (#{@user_ids.join(',')})"
  end

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
        users.id AS id,
        users.first_name || ' ' || users.last_name AS name,
        json_agg(stats.count ORDER BY stats.period ASC) AS counts,
        json_agg(stats.period ORDER BY stats.period ASC) AS periods,
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
        ORDER BY dates.dates_series ASC
      ) stats
      LEFT JOIN users ON users.id = stats.user_id
      #{user_ids_where}
      GROUP BY users.id
    "
  end
end

