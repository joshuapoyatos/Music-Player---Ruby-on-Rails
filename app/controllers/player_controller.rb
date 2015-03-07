class PlayerController < ApplicationController
	before_action :require_login
	require 'taglib'

	def index
	end
	
	def get_global_songs
		if params[:choice] == "globalsongs" || params[:choice] == "byartist" || params[:choice] == "byalbum"
			render :json => { :songs => Song.all}
		elsif params[:choice] == "localsongs"
			render :json => { :songs => User.where(id: session[:user_id]).first.songs}
		elsif params[:choice] == "selectplaylist"
			render :json => { :songs => User.where(id: session[:user_id]).first.playlists}		
		end
	end
	
	def get_playlist_songs
		render :json => { :songs => Playlist.where(id: params[:choice]).first.songs }
	end
	
	def get_album_songs
		render :json => { :songs => Song.where(album: params[:choice]).to_a }
	end
	
	def get_artist_songs
		render :json => { :songs => Song.where(artist: params[:choice]).to_a }
	end
	
	def play_song 
		render :json => { :songs => Song.where(id: params[:id]).first} 
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

	def require_login
		redirect_to '/login' if session[:user_id].nil?
	end
	
end
