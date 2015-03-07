class AddIndex < ActiveRecord::Migration
  def change
	add_index :users_playlists, [:user_id, :playlist_id]
	add_index :playlists_songs, [:song_id, :playlist_id]
	add_index :users_songs, [:song_id, :user_id]
  end
end
