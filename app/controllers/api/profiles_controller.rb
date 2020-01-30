# frozen_string_literal: true

module Api
  class ProfilesController < BaseController
    def show
      @user = current_user
      @report = PeriodUserContactsGainQuery.new(
        'month',
        from: Time.current - 6.months,
        to: Time.current,
        user_ids: [current_user.id],
        strftime: '%b'
      ).call.first
    end

    def read_notifications
      current_user.update(notifications_last_read_at: Time.current)
    end

    def update
      @user = current_user

      return render json: @user.errors.as_json unless @user.update(user_params)

      @report = PeriodUserContactsGainQuery.new(
        'month',
        from: Time.current - 6.months,
        to: Time.current,
        user_ids: [current_user.id],
        strftime: '%b'
      ).call.first
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :avatar, :signature)
    end
  end
end