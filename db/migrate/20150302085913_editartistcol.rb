class Editartistcol < ActiveRecord::Migration
  def change
  
	rename_column :songs, :arist, :artist
  end
end
