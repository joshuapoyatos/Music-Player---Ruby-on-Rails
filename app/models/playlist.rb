class Playlist < ActiveRecord::Base
	has_many :playlists_songs
	has_many :songs, through: :playlists_songs
	has_many :users_playlists
	has_many :users, through: :users_playlists
	
	def self.create_playlist(name)
		new_playlist = Playlist.create(name: name)
		new_playlist
	end
	
end
