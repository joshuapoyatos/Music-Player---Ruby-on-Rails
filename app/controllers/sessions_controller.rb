class SessionsController < ApplicationController
	skip_before_action :require_login, except: :logout
	def login_page
		if session[:user_id]
			redirect_to '/index'
		end
	end
	
	def login
		user = User.authenticate(params[:username], params[:password])
		if user
			session[:user_id] = user.id
			redirect_to '/index'
		else
			redirect_to action: :login_page
		end
	end
	
	def logout
		session[:user_id] = nil
		redirect_to action: :login_page
	end
end
