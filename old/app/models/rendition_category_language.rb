class RenditionCategoryLanguage < ActiveRecord::Base
	belongs_to :rendition
	belongs_to :category
	belongs_to :language
end
