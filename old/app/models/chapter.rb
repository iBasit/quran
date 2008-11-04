class Chapter < ActiveRecord::Base
    has_many :verse

    has_many :title
    has_many :language, :through => :title

    def verses
        Verse.find_all_by_chapter_id(self.chapter_id)
    end

end
