# frozen_string_literal: true

module Api
  class TasksController < BaseController
    def index
      contact = Contact.find(params[:contact_id])

      render json: contact.tasks.as_json
    end

    def create
      contact = Contact.find(params[:contact_id])

      task = contact.tasks.new(task_zone_params.merge(created_by_id: current_user.id))
      task.save!

      NotificationWorker.perform_at(task.send_at, task.id)

      render json: task.as_json
    end

    private

    def task_zone_params
      task_params.tap do |param|
        param[:send_at] = set_in_timezone(param[:send_at], params[:zone]).utc
      end
    end

    def task_params
      params.require(:task).permit(:user_id, :description, :send_at)
    end
  end
end
