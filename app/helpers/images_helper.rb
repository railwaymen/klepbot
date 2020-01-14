module ImagesHelper
  def self.base64_to_attached_file(base64)
    decoded_base64 = Base64.decode64(base64)
    file = Tempfile.new('filename.jpg', encoding: 'ascii-8bit')
    file.write(base64)
    file.rewind
    ActionDispatch::Http::UploadedFile.new(tempfile: file, filename: '')
  end
end
