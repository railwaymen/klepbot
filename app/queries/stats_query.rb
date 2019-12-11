# frozen_string_literal: true

class StatsQuery
  class StatModel
    attr_reader :count, :period, :name

    def initialize(name: 'period', count:, period:)
      @count = count
      @period = period
      @name = name
    end
  end

  def initialize(period)
    @period = period
  end

  def self.events
    ContactEvent.all.map do |e|
      { :"#{e.name.downcase.gsub(' ', '_')}" => (:name.to_proc >> query.method(:events)).(e) }
    end.reduce({}, :merge)
  end

  def execute(raw)
    ActiveRecord::Base
      .connection
      .execute(raw)
      .map(&:symbolize_keys.to_proc >> StatModel.method(:new))
  end

  def events_raw(event_name)
    execute("
      SELECT
        contact_events.name,
        COUNT(contacts.*),
        date_trunc('#{@period}', contacts.created_at) AS period
      FROM contact_events
      INNER JOIN contacts ON contact_events.id = contacts.contact_event_id
      WHERE contact_events.name = '#{event_name}'
      GROUP BY period, contact_events.name
      ORDER BY period DESC
    ")
  end

  def contacts_raw
    execute("
      SELECT
        COUNT(*),
        date_trunc('#{@period}', created_at) AS period
      FROM contacts
      GROUP BY period
      ORDER BY period DESC
      LIMIT 2
    ")
  end

  def statuses_raw(status_name)
    execute("
      SELECT
        contact_statuses.name,
        COUNT(contacts.*),
        date_trunc('#{@period}', contacts.updated_at) AS period
      FROM contact_statuses
      INNER JOIN contacts ON contact_statuses.id = contacts.contact_status_id
      WHERE contact_statuses.name = '#{status_name}'
      GROUP BY period, contact_statuses.name
      ORDER BY period DESC
    ")
  end
end
