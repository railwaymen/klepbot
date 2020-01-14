# frozen_string_literal: true

require 'csv'

module Export
  class PrepareService
    attr_reader :columns, :collect, :actions

    def initialize(main, columns: [], collect: [], actions: [])
      @main = main
      @collect = collect.map(&:to_sym)
      @columns = columns.map(&:to_sym)
      @actions = actions.map(&:to_sym)
    end

    def resolve
      scope = @main.select(@columns).joins(@collect)

      @actions.each(&scope.method(:public_send))
      scope
    end

    def to_csv
      CSV.generate do |csv|
        csv << columns

        resolve.find_each do |element|
          csv << columns.map(&element.method(:public_send))
        end
      end
    end
  end
end

# Export::PrepareService.new(
#   Card,
#   columns: ['id', 'first_name', 'last_name'],
#   actions: ['distinct']
# ).to_csv

# Export::PrepareService.new(
#   User,
#   'id, first_name, last_name',
#   '',
# )
