class VerseRendition < ActiveRecord::Base
    belongs_to :verse
    belongs_to :rendition
end
