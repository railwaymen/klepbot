# frozen_string_literal: true

class Card < ApplicationRecord
  has_one_attached :image

  def server_file_path
    ActiveStorage::Blob.service.send(:path_for, image.key)
  end
end
