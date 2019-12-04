# frozen_string_literal: true

module Cards
  class ImageService
    PREPROCESS = 'blur'
    PYTHON_PATH = './app/python'

    def initialize(card)
      @card = card
    end

    def call
      read
      @card.reload

      @card.metadata
           .yield_self(&method(:find_email))
           .yield_self(&method(:find_names))
           .yield_self(&method(:find_websites))
           .yield_self(&method(:find_phone_numbers))

      @card.save!
    end

    private

    def find_names(metadata)
      service = NamesService.new(metadata, @card.email)
      first_name, last_name = service.names

      @card.first_name = first_name
      @card.last_name = last_name
      @card.possible_names = service.possible_names

      metadata
    end

    def find_email(metadata)
      match = metadata.match(/[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+/)
      @card.email = match

      metadata
    end

    def find_websites(metadata)
      match = metadata
              .scan(%r{((https?://)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(/\S*)?)})
              .flatten
              .filter { |number| number.present? && number.split('.').size > 1 }
              .join(',')

      @card.websites = match

      metadata
    end

    def find_phone_numbers(metadata)
      @card.phone_numbers = metadata
                            .scan(/((\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*)/)
                            .flatten
                            .map(&:strip)
                            .filter { |n| n.present? && n.length > 5 }
                            .join(',')
    end

    def read
      Kernel.system(
        "python #{PYTHON_PATH}/ocr.py " \
        "--image #{@card.server_file_path} " \
        "--preprocess #{PREPROCESS} -id #{@card.id}"
      )
    end
  end
end
