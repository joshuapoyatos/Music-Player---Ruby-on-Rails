class Add < ActiveRecord::Migration
  def change
	add_column :playlists, :playlist_id, :integer
  end
end
