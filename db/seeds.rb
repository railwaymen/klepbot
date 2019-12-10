# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  user = User.create!(
    email: 'user@example.com',
    password: 'password'
  )

  statuses = ContactStatus.create!([
    { color: '#0c0c0c', name: 'First contact' },
    { color: '#4775FF', name: 'Estimate' },
    { color: '#FFC422', name: 'Workshops' },
    { color: '#FF3014', name: 'Lost' }
  ])

  events = ContactEvent.create!([
    { color: '#7248E8', name: 'Gitex' },
    { color: '#3AC0E8', name: 'Websummit' },
    { color: '#3D8FFF', name: 'Linkedin' },
    { color: '#3874E8', name: 'Clutch' }
  ])

  100.times do |i|
    Contact.create!(
      first_name: "First #{i}",
      last_name: "Last #{i}",
      user_id: user.id,
      touched_id: user.id,
      contact_status_id: statuses.sample.id,
      contact_event_id: events.sample.id,
      email: "first#{i}.last#{i}@example.com"
    )
  end
end
