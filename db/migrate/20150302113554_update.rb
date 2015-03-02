class Update < ActiveRecord::Migration
  def change
	delete_column :users, :song_id
	delete_column :users, :playlist_id
	delete_column :playlists, :song_id
  end
end
