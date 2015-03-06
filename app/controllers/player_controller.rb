class PlayerController < ApplicationController
	before_action :require_login

	require 'taglib'

	def index
		@results = Song.all
	end
	
	def postindex
		song = Song.save_to_server(params)
		
		TagLib::MPEG::File.open("public/Songs/"+ params[:mp3file].original_filename ) do |file|
			tag = file.id3v2_tag

			@stitle = tag.title
			
			if !tag.artist.present?
				@sartist= ""
			else
				@sartist = tag.artist
			end
			
			if !tag.album.present?
				@salbum= ""
			else
				@salbum = tag.album
			end	
			
			cover = tag.frame_list('APIC').first
			if cover.present?
				mime_type = cover.mime_type
				picture = cover.picture
			
				extension = case cover.mime_type
					when 'image/jpeg', 'image/jpg'
						'jpg'
					when 'image/gif'
						'gif'
					else
						'png'
				end
				
				@file_name = tag.title + " - " + tag.artist + ".#{extension}"

				File.open("public/Songs/Album Artwork/" + @file_name, "wb") do |f|
					f.write(picture)	
				end
			end

			song = Song.add_song(tag.title, tag.artist, tag.album, params[:mp3file].original_filename)
		end
		redirect_to action: :index
	end
	
	def playlists
	end
	
	def require_login
		redirect_to '/login' if session[:user_id].nil?
	end
	
end
