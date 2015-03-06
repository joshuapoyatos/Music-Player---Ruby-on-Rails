class CreateUsersSongs < ActiveRecord::Migration
  def change
	 drop_table :playlists_songs
    create_table :users_songs do |t|

      t.timestamps null: false
    end
  end
end
