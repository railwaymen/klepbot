# frozen_string_literal: true

module Api
  class ContactStatusesController < BaseController
    def index
      render json: ContactStatus.all.as_json
    end

    def show
      render json: ContactStatus.find(params[:id]).as_json
    end

    def create
      contact_status = ContactStatus.new(contact_status_params)

      if contact_status.save
        render json: contact_status.as_json
      else
        render json: contact_status.errors.as_json, status: :unprocessable_entity
      end
    end

    def update
      contact_status = ContactStatus.find(params[:id])

      if contact_status.update(contact_status_params)
        render json: contact_status.as_json
      else
        render json: contact_status.errors.as_json, status: :unprocessable_entity
      end
    end

    def destroy
      contact_status = ContactStatus.find(params[:id])

      if contact_status.destroy
        render json: {}, status: :no_content
      else
        render json: contact_status.errors.as_json, status: :unprocessable_entity
      end
    end

    private

    def contact_status_params
      params.require(:contact_status).permit(:name, :color)
    end
  end
end
