class Category < ActiveRecord::Base
	has_many :rendition_category_language
	has_many :rendition, :through => :rendition_category_language
	has_many :language, :through => :rendition_category_language
	acts_as_list
	validates_presence_of :name
	validates_uniqueness_of :name
end
