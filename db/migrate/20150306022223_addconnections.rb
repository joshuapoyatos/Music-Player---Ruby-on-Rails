class Addconnections < ActiveRecord::Migration
	def change
		create_table :users_songs do |t|
		  t.belongs_to :users, index: true
		  t.belongs_to :songs, index: true
		  t.timestamps null: false
		end
		create_table :users_playlists do |t|
		  t.belongs_to :users, index: true
		  t.belongs_to :playlists, index: true
		  t.timestamps null: false
		end
		create_table :playlists_songs do |t|
		  t.belongs_to :playlists, index: true
		  t.belongs_to :songs, index: true
		  t.timestamps null: false
		end
	end
end
