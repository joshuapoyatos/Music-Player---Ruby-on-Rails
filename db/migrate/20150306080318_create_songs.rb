class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :name
      t.string :album
      t.string :artist
      t.string :file_name

      t.timestamps null: false
    end
  end
end
