class PlayerController < ApplicationController
	require "id3tag"
	def index
		@name = 'Joshua'
		puts "PAKYU"
		@file = params.permit(:mp3file.object_value)
		if @file.present?
			@name ='me'
		end
	end
	
	def postindex
		@name = 'shit'
	end
	
end
