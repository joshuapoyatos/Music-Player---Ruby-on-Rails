class Delete < ActiveRecord::Migration
  def change
	remove_column :users, :song_id
	remove_column :users, :playlist_id
	remove_column :playlists, :song_id
  end
end
