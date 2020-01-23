# frozen_string_literal: true

class PeriodEventsContactsQuery
  def initialize(period = 'month', from: Time.current - 12.months, to: Time.current, event_ids: [])
    @period = period
    @from = from + 1.send(period)
    @to = to + 1.send(period)
    @event_ids = event_ids.reject(&:blank?)
  end

  def call
    ActiveRecord::Base
      .connection
      .execute(raw)
      .map(&:symbolize_keys.to_proc >> Stats::DataRecord.method(:new))
  end

  private

  def event_ids_where
    return '' if @event_ids.empty?

    "WHERE contact_events.id IN (#{@event_ids.join(',')})"
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

  def raw # rubocop:disable Metrics/MethodLength
    "
      SELECT
        contact_events.id AS id,
        contact_events.name AS name,
        contact_events.color AS color,
        json_agg(stats.count ORDER BY stats.period ASC) AS counts,
        json_agg(stats.period ORDER BY stats.period ASC) AS periods
      FROM (
        SELECT
          COUNT(contacts.*)
            FILTER (WHERE date_trunc('#{@period}', contacts.created_at) = dates.dates_series),
          contact_events.id AS contact_event_id,
          dates.dates_series AS period
        FROM contact_events
        LEFT JOIN contacts ON contact_events.id = contacts.contact_event_id
        cross JOIN (
          #{raw_series}
        ) dates
        GROUP BY contact_events.id, dates.dates_series
        ORDER BY dates.dates_series ASC
      ) stats
      LEFT JOIN contact_events ON contact_events.id = stats.contact_event_id
      #{event_ids_where}
      GROUP BY contact_events.id
    "
  end
end
