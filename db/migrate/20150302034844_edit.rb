class Edit < ActiveRecord::Migration
  def change 
	add_column :songs, :artist, :string
	add_column :songs, :title, :string
  end
end
