class Deletetitle < ActiveRecord::Migration
  def change
	remove_column :songs, :title
  end
end
