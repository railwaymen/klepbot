json.extract!(
  card,
  :id,
  :first_name,
  :last_name,
  :email,
  :body,
  :metadata,
  :phone_numbers,
  :websites,
  :possible_names
)

json.image_url card.image.attached? ? url_for(card.image) : ''