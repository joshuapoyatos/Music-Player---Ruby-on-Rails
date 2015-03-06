class Addindices < ActiveRecord::Migration
  def change
	add_index :users_songs, [:user_id, :song_id]
	
  end
end
