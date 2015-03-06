class CreateUsersPlaylists < ActiveRecord::Migration
  def change
    create_table :users_playlists do |t|

      t.timestamps null: false
    end
  end
end
