# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_21_113122) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "cards", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.text "metadata"
    t.string "email"
    t.string "company_name"
    t.string "phone_numbers"
    t.string "websites"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "body"
    t.string "possible_names", default: [], array: true
  end

  create_table "contact_actions", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "category"
    t.string "group"
    t.bigint "contact_id", null: false
    t.string "reason"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "contact_status_id", null: false
    t.bigint "contact_event_id", null: false
    t.bigint "user_id", null: false
    t.bigint "touched_id"
    t.text "email_body"
    t.string "action_type", default: "update"
    t.index ["contact_event_id"], name: "index_contact_actions_on_contact_event_id"
    t.index ["contact_id"], name: "index_contact_actions_on_contact_id"
    t.index ["contact_status_id"], name: "index_contact_actions_on_contact_status_id"
    t.index ["touched_id"], name: "index_contact_actions_on_touched_id"
    t.index ["user_id"], name: "index_contact_actions_on_user_id"
  end

  create_table "contact_events", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "contact_statuses", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "category"
    t.string "group"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "contact_status_id", null: false
    t.bigint "contact_event_id", null: false
    t.bigint "user_id", null: false
    t.bigint "touched_id"
    t.index ["contact_event_id"], name: "index_contacts_on_contact_event_id"
    t.index ["contact_status_id"], name: "index_contacts_on_contact_status_id"
    t.index ["touched_id"], name: "index_contacts_on_touched_id"
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "email_templates", force: :cascade do |t|
    t.string "name", null: false
    t.text "body", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "contact_id", null: false
    t.bigint "created_by_id"
    t.text "description", null: false
    t.datetime "send_at", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["contact_id"], name: "index_tasks_on_contact_id"
    t.index ["created_by_id"], name: "index_tasks_on_created_by_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "signature"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "contact_actions", "contact_events"
  add_foreign_key "contact_actions", "contact_statuses"
  add_foreign_key "contact_actions", "contacts"
  add_foreign_key "contact_actions", "users"
  add_foreign_key "contact_actions", "users", column: "touched_id"
  add_foreign_key "contacts", "contact_events"
  add_foreign_key "contacts", "contact_statuses"
  add_foreign_key "contacts", "users"
  add_foreign_key "contacts", "users", column: "touched_id"
  add_foreign_key "tasks", "contacts"
  add_foreign_key "tasks", "users"
  add_foreign_key "tasks", "users", column: "created_by_id"
end
