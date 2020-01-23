# frozen_string_literal: true

module Api
  class TasksController < BaseController
    def index
      contact = Contact.find(params[:contact_id])

      render json: contact.tasks.as_json
    end

    def create
      contact = Contact.find(params[:contact_id])

      task = contact.tasks.new(task_params.merge(created_by_id: current_user.id))

      # raise task.send_at.in_time_zone(params[:zone]).utc.inspect

      task.save!

      parsed_time = task.send_at.in_time_zone(params[:zone]).utc

      NotificationWorker.perform_at(parsed_time, task.id)

      render json: task.as_json
    end

    private

    def task_params
      params.require(:task).permit(:user_id, :description, :send_at)
    end
  end
end
