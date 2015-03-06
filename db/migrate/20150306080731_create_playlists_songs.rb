class CreatePlaylistsSongs < ActiveRecord::Migration
  def change
    create_table :playlists_songs do |t|
      t.integer :song_id
      t.integer :playlist_id

      t.timestamps null: false
    end
  end
end
