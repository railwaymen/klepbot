# frozen_string_literal: true

module Api
  class TaskTypesController < BaseController
    def index
      render json: TaskType.all
    end

    def create
      task_type = TaskType.new(task_type_params)

      if task_type.save
        render json: task_type.as_json
      else
        render json: task_type.errors.as_json, status: :unprocessable_entity
      end
    end

    def create
      task_type = TaskType.find(params[:id])

      if task_type.update(task_type_params)
        render json: task_type.as_json
      else
        render json: task_type.errors.as_json, status: :unprocessable_entity
      end
    end

    private

    def task_type_params
      params.require(:task_type).permit(:name, :color)
    end
  end
end
