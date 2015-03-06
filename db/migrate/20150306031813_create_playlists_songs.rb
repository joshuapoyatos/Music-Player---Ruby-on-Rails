class CreatePlaylistsSongs < ActiveRecord::Migration
  def change
    create_table :playlists_songs do |t|

      t.timestamps null: false
    end
  end
end
