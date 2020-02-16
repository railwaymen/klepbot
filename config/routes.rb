# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  root 'dashboard#show'

  resource :dashboard, only: :show, controller: :dashboard

  namespace :api, constraints: { format: 'json' } do
    resources :cards, only: %i[index show create update]
    resources :contact_events, only: %i[index show create update destroy]
    resources :contact_statuses, only: %i[index show create update destroy]
    resources :users, only: :index
    resources :task_types, only: %i[index create update]
    resource :profile, only: %i[show update] do
      collection do
        post :read_notifications
        get :tasks
      end
    end
    resources :notifications, only: :index
    resources :stats, only: :index do
      collection do
        get :period_users_gain
        get :period_events_gain
      end
    end
    resources :contacts, except: %i[destroy edit] do
      resources :actions, controller: :contact_actions, only: %i[index create]
      resources :tasks, only: %i[index create]
    end
    resources :email_templates, only: %i[index show create update]
    devise_for :users, controllers: { sessions: 'api/sessions' }
  end

  get '/' => 'dashboard#show', constraints: { format: :html }
  get '*pages' => 'dashboard#show', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
