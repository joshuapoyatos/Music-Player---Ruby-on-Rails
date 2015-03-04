class Song < ActiveRecord::Base
	belongs_to :playlist
	belongs_to :user
	
	def self.add_song(name, artist, album, file_name, user)
		return false if !name.present?	
		return false if !file_name.present?	
		new_song = Song.create(name: name, artist: artist, album: album, file_name: file_name, user_id: user)
		new_song
	end
	
	def self.save_to_server(upload)
		directory = "public/Songs"
		path = File.join(directory, upload[:mp3file].original_filename)
		File.open(path, "w+b") { |f| f.write(upload[:mp3file].read) }
	end
	
	def self.delete_song(name)
		Song.where(name: name).first.destroy
	end
	
	def self.get_song(name)
		Song.where(name: name).first
	
	end
end
