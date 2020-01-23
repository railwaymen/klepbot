# frozen_string_literal: true

module Contacts
  class SearchQuery
    SEARCH_FIELDS = %w[first_name last_name email category].freeze

    def initialize(scope, query)
      @scope = scope
      @query = query
    end

    def call
      return @scope if @query.blank?

      @scope.where(*where_condition)
    end

    private

    def where_condition
      condition = SEARCH_FIELDS.map do |element|
        "#{element} ILIKE ?"
      end.join(' OR ')

      values = SEARCH_FIELDS.map { |_el| "%#{@query}%" }

      [condition, *values]
    end
  end
end
