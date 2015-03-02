class Playlist < ActiveRecord::Base
	belongs_to :user, dependent: :destroy
	has_many :songs
end
