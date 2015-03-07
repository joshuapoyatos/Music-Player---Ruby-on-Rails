class RegisterController < ApplicationController
	def register_page
	end
	
	def register
		user = User.create_user(params[:name], params[:username], params[:password], params[:confirmpass])
		
		if user != false
			redirect_to '/login'
		else
			redirect_to action: :register
		end
	end
	
end
