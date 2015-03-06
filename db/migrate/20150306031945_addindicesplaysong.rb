class Addindicesplaysong < ActiveRecord::Migration
  def change
	
	add_column :users_playlists, :user_id, :integer
	add_column :users_playlists, :playlist_id, :integer
	
	add_column :playlists_songs, :song_id, :integer
	add_column :playlists_songs, :playlist_id, :integer
	
	add_index :users_playlists, [:user_id, :playlist_id]
	add_index :playlists_songs, [:song_id, :playlist_id]
  end
end
