class Title < ActiveRecord::Base
    belongs_to :chapter
    belongs_to :language
end
