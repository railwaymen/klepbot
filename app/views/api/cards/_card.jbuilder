json.extract!(
  card,
  :id,
  :first_name,
  :last_name,
  :email,
  :body,
  :metadata,
  :phones,
  :websites,
  :possible_names
)

json.image_url card.image.attached? ? url_for(card.image) : ''
