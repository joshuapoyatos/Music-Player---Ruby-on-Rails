class Edit < ActiveRecord::Migration
  def change 
  	add_column :users, :username, :string
	add_column :users, :password_hash, :string
	add_column :users, :salt, :string
	add_column :songs, :album, :string
	edit_column :songs, :arist, :string
	add_column :songs, :title, :string
  end
end
