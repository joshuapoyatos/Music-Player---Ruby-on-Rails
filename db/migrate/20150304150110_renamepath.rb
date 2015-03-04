class Renamepath < ActiveRecord::Migration
  def change
	rename_column :songs, :path, :file_name
  end
end
