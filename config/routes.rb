# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  root 'dashboard#show'

  resource :dashboard, only: :show, controller: :dashboard

  namespace :api, constraints: { format: 'json' } do
    resources :cards, only: %i[index create update]
    resources :contact_events, only: :index
    resources :contact_statuses, only: :index
    resources :stats, only: :index
    resources :contacts, except: %i[destroy edit] do
      resources :actions, controller: :contact_actions, only: %i[index create]
    end
    resources :email_templates, only: %i[index show create update]
    devise_for :users, controllers: { sessions: 'api/sessions' }
  end

  get '/' => 'dashboard#show', constraints: { format: :html }
  get '*url' => 'dashboard#show', constraints: { format: :html }
end
