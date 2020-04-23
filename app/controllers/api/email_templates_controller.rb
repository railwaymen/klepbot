# frozen_string_literal: true

module Api
  class EmailTemplatesController < BaseController
    def index
      render json: EmailTemplate.all.as_json
    end

    def show
      render json: EmailTemplate.find(params[:id]).as_json
    end

    def create
      email_template = EmailTemplate.new(email_template_params)

      if email_template.save
        render json: email_template
      else
        render json: email_template.errors.messages, status: :unprocessable_entity
      end
    end

    def update
      email_template = EmailTemplate.find(params[:id])

      if email_template.update(email_template_params)
        render json: email_template
      else
        render json: email_template.errors.messages, status: :unprocessable_entity
      end
    end

    private

    def email_template_params
      params.require(:email_template).permit(:name, :body, :subject)
    end
  end
end
