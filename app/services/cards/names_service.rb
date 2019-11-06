# frozen_string_literal: true

module Cards
  class NamesService
    def initialize(metadata, email)
      @metadata = metadata
      @email = email
    end

    def names
      most_accurate_possible_name&.split(' ')
    end

    # rubocop:disable Metrics/LineLength

    def possible_names
      @possible_names ||= @metadata.scan(
        /(\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1}      [a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5})/
      ).map(&:first)
    end

    # rubocop:enable Metrics/LineLength

    private

    def most_accurate_possible_name
      email_letters = @email.match(/[a-z]?.+@/).to_s.split('')

      if possible_names.length == 1
        possible_names.first
      elsif possible_names.length > 1
        resolve_array_of_names(email_letters)
      end
    end

    def resolve_array_of_names(email_letters)
      max_word_index = 0
      max_word_letters_match = 0

      possible_names.each_with_index do |word, index|
        length = (word.split('') & email_letters).uniq.length

        max_word_index = index if length > max_word_letters_match
      end

      possible_names[max_word_index]
    end
  end
end
