class CreateUsersSongs < ActiveRecord::Migration
  def change
    create_table :users_songs do |t|
      t.integer :user_id
      t.integer :song_id

      t.timestamps null: false
    end
  end
end
