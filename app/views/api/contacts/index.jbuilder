json.array! @contacts do |contact|
  json.partial! 'contact', contact: contact
end
