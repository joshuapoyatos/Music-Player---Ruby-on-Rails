class AddUsers < ActiveRecord::Migration
  def change
		add_column :users, :id, :integer
		add_column :users, :name, :integer
		add_column :users, :username, :string
		add_column :users, :password_hash, :string
		add_column :users, :hash, :string
  end
end
