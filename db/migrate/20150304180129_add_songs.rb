class AddSongs < ActiveRecord::Migration
  def change
		add_column :songs, :id, :integer
		add_column :songs, :name, :string
		add_column :songs, :album, :string
		add_column :songs, :artist, :string
		add_column :songs, :file_name, :string
		add_column :songs, :user_id, :integer
  end
end
