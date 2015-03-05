class CreateSongPlaylists < ActiveRecord::Migration
  def change
    create_table :song_playlists do |t|
      t.integer :song_id
      t.integer :playlist_id

      t.timestamps null: false
    end
  end
end
