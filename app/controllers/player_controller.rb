class PlayerController < ApplicationController
	before_action :require_login

	require 'taglib'
	def index
		@file_name = "";
		@name = User.where(id: session[:user_id]).first.name
		@shit = params[:mp3file]
		if @shit.present?
			TagLib::MPEG::File.open(File.dirname(File.dirname(__FILE__))+"/assets/songs/"+params[:mp3file] ) do |file|
				tag = file.id3v2_tag

				@stitle = tag.title
				@sartist = tag.artist
				@salbum = tag.album
				cover = tag.frame_list('APIC').first
				mime_type = cover.mime_type
				picture = cover.picture
				if cover.picture.present?
				extension = case cover.mime_type
				  when 'image/jpeg', 'image/jpg'
					'jpg'
				  when 'image/gif'
					'gif'
				  else
					raise "Mime not found"
				end
				end

				@file_name = tag.title+ ".#{extension}"

				File.open(File.dirname(File.dirname(__FILE__))+"/assets/images/"+ @file_name, "wb") do |f|
				  f.write(picture)	
				end
				#song = Song.add_song(tag.title, tag.artist, tag.album, params[:mp3file]) <----code for adding to database
			end

		end
	end
	
	def postindex
		redirect_to action: :index
	end
	
	def playlists
	end
	
	def require_login
		redirect_to '/login' if session[:user_id].nil?
	end
	
end
