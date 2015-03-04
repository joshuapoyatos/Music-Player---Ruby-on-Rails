class AddPlaylists < ActiveRecord::Migration
  def change
		add_column :playlists, :id, :integer
		add_column :playlists, :name, :string
		add_column :playlists, :user_id, :integer
		add_column :playlists, :playlist_id, :integer
  end
end
