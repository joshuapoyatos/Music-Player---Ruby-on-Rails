class CreateUsersPlaylists < ActiveRecord::Migration
  def change
    create_table :users_playlists do |t|
      t.integer :user_id
      t.integer :playlist_id

      t.timestamps null: false
    end
  end
end
