class Playlist < ActiveRecord::Base
	belongs_to :user
	has_many :songs
	
	def self.create_playlist(name, user)
		new_playlist = Playlist.create(name: name, user_id: user)
			new_playlist
	end
	
	def self.add_to_playlist(name, song, user)
		playlist = Playlist.where(name: name, user_id: user).first
		if playlist.present? && !playlist.song.present?
			playlist.song = song
			playlist.save #
		else 
			playlist = Playlist.create(name: name, user_id: user, song_id: song)
		end
		playlist
	end
	
end
