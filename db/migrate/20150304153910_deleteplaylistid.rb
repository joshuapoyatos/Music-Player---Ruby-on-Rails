class Deleteplaylistid < ActiveRecord::Migration
  def change
	remove_column :songs, :playlist_id
  end
end
