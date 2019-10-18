# frozen_string_literal: true

module Cards
  class ImageService
    PREPROCESS = 'blur'
    PYTHON_PATH = './app/python'

    attr_reader :card

    def initialize(card)
      @card = card
    end

    def call
      read
      @card.reload

      @card.metadata
           .gsub('\n', ' ')
           .yield_self(&method(:find_email))
           .yield_self(&method(:find_websites))
           .yield_self(&method(:find_phone_numbers))

      @card.save!
    end

    def find_email(metadata)
      match = metadata.match(/[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+/)
      @card.email = match

      metadata.gsub(match.to_s, '')
    end

    def find_websites(metadata)
      match = metadata
              .scan(%r{((https?://)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(/\S*)?)})
              .flatten
              .filter { |number| number.present? && number.split('.').size > 1 }
              .join(', ')

      @card.websites = match

      metadata
    end

    def find_phone_numbers(metadata)
      @card.phone_numbers = metadata
                            .scan(/((\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*)/)
                            .flatten
                            .filter { |n| n.present? && n.length > 5 }
                            .join(',')
    end

    def read
      system(
        "python #{PYTHON_PATH}/ocr.py " \
        "--image #{@card.server_file_path} " \
        "--preprocess #{PREPROCESS} -id #{@card.id}"
      )
    end
  end
end
