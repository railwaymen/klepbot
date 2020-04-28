# frozen_string_literal: true

module Gmail
  class Email
    attr_reader :id, :thread_id, :label_ids, :history_id

    def initialize(id:, thread_id:, label_ids:, history_id:, **)
      @id = id
      @thread_id = thread_id
      @label_ids = label_ids
      @history_id = history_id
    end

    def read?
      !label_ids.include?('UNREAD')
    end

    def delivered?
      label_ids.include?('SENT')
    end
  end
end
