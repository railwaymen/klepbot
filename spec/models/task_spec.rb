# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Task, type: :model do
  it { is_expected.to validate_presence_of(:contact_id) }
  it { is_expected.to validate_presence_of(:user_id) }
  it { is_expected.to validate_presence_of(:created_by_id) }
  it { is_expected.to validate_presence_of(:description) }
  it { is_expected.to validate_presence_of(:send_at) }
end
