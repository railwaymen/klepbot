# frozen_string_literal: true

module Api
  class ContactEventsController < BaseController
    def index
      render json: ContactEvent.all.as_json
    end

    def show
      render json: ContactEvent.find(params[:id]).as_json
    end

    def create
      contact_event = ContactEvent.new(contact_event_params)

      if contact_event.save
        render json: contact_event.as_json
      else
        render json: contact_event.errors.as_json, status: :unprocessable_entity
      end
    end

    def update
      contact_event = ContactEvent.find(params[:id])

      if contact_event.update(contact_event_params)
        render json: contact_event.as_json
      else
        render json: contact_event.errors.as_json, status: :unprocessable_entity
      end
    end

    def destroy
      contact_event = ContactEvent.find(params[:id])

      if contact_event.destroy
        render json: {}, status: :no_content
      else
        render json: contact_event.errors.as_json, status: :unprocessable_entity
      end
    end

    private

    def contact_event_params
      params.require(:contact_event).permit(:name, :color)
    end
  end
end
