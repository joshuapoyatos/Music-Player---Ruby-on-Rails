class Song < ActiveRecord::Base
	has_many :users_songs
	has_many :users, through: :users_songs
	has_many :playlists_songs
	has_many :playlists, through: :playlists_songs
	

	def self.add_song(name, artist, album, file_name)
		return false if !name.present?	
		return false if !file_name.present?	
		new_song = Song.create(name: name, artist: artist, album: album, file_name: file_name)
		new_song
	end
	
	def self.save_to_server(upload)
		directory = "public/Songs"
		path = File.join(directory, upload[:mp3file].original_filename)
		File.open(path, "w+b") { |f| f.write(upload[:mp3file].read) }
	end
	
	def self.delete_song(id)
		Song.where(id: id).first.destroy
	end
	
	def self.get_song(name)
		Song.where(name: name).first
	
	end
end
