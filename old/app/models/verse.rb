class Verse < ActiveRecord::Base
    has_many :verse_rendition
    has_many :rendition, :through => :verse_rendition

    belongs_to :chapter
end
