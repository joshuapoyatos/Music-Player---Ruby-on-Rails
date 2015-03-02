class Song < ActiveRecord::Base
	belongs_to :playlist
	belongs_to :user
	
	def self.add_song(name, artist, album, path)
		if !artist.present?
			artist= ""
		end
		if !album.present?
			album= ""
		end
		return false if !name.present?	
		return false if !path.present?	
		new_song = Song.create(name: name, artist: artist, album: album, path: path)
		new_song
	end
	
	def self.delete_song(name)
		Song.where(name: name).first.destroy
	end
	
	def self.get_song(name)
		Song.where(name: name).first
	
	end
end
