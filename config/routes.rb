# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  root 'dashboard#show'

  resource :dashboard, only: :show, controller: :dashboard

  namespace :api, constraints: { format: 'json' } do
    resources :cards, only: %i[index create]
    resources :email_templates, only: :index
    devise_for :users, controllers: { sessions: 'api/sessions' }
  end
end
