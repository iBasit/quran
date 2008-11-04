class QuranController < ApplicationController
    def index
        @chapters = Chapter.find_by_sql("select chapter.chapter_id, title.name from chapter, title where chapter.chapter_id = title.chapter_id and language_id=1");
        @chapters.each { |chapter|
                    chapter[:number] = chapter.chapter_id.to_s;
                    chapter[:number] = chapter[:number].
                    gsub(/1/,'١').
                    gsub(/2/,'٢').
                    gsub(/3/,'٣').
                    gsub(/4/,'٤').
                    gsub(/5/,'٥').
                    gsub(/6/,'٦').
                    gsub(/7/,'٧').
                    gsub(/8/,'٨').
                    gsub(/9/,'٩').
                    gsub(/0/,'٠');
        }
    end
end
