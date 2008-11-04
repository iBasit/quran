class PageController < ApplicationController
    def show
        id = 1;
        ending_id = 30;
        @page_verses['verses'] = Verse.find_by_sql("select * from verse where 
            verse.verse_id >= #{id}
            and
            verse.verse_id <= #{ending_id}");

=begin
        page = Page.find(params[:id])
        @page_verses = Hash.new()
        @page_verses['page'] = page
        if (true)
            condition = "verse.verse_id >= (select verse_id from verse where chapter_id = #{page.start_chapter} and verse_number = #{page.start_verse}) and verse.verse_id <= (select verse_id from verse where chapter_id = #{page.end_chapter} and verse_number = #{page.end_verse})";
            if (params[:select])
                select_params = ActiveSupport::JSON.decode(params[:select])
                arabic_id  = (select_params['arabic'].type  == Fixnum)? select_params['arabic']  : 0;
                tafseer_id = (select_params['tafseer'].type == Fixnum)? select_params['tafseer'] : 0;
                english_id = (select_params['english'].type == Fixnum)? select_params['english'] : 0;
                verses = Verse.find_by_sql("select verse.sajdah_mustahib, verse.sajdah_wajib, verse.verse_number, verse_rendition.content from verse, verse_rendition where verse.verse_id=verse_rendition.verse_id and verse_rendition.rendition_id = #{arabic_id} and #{condition}");
            else
                verses = Verse.find_by_sql("select * from verse where #{condition}")
            end
            @page_verses['verses'] = verses
            # handle rendition
        end
=end
        respond_to do |format|
            format.html { render :template => 'page/show' }
            format.xml  { render :xml => @page_verses }
            format.js   { render :json => @page_verses }
        end
    end
    def get
        start_id = params[:id].to_i;
        count    = params[:count].to_i;
        end_id   = start_id + count - 1;

        condition = "verse.verse_id >= #{start_id} and verse.verse_id <= #{end_id}";
        arabic_id  = 4;
        tafseer_id = 8;
        english_id = 12;
        if (params[:type] == 'quran')
            rendition_id = arabic_id
        end
        if (params[:type] == 'translation')
            rendition_id = english_id
        end
        if (params[:type] == 'tafseer')
            rendition_id = tafseer_id
        end
        verses = Verse.find_by_sql("select verse.verse_id, verse.chapter_id, verse.sajdah_mustahib, verse.sajdah_wajib, verse.verse_number, verse_rendition.content 
        from verse, verse_rendition 
        where verse.verse_id=verse_rendition.verse_id and verse_rendition.rendition_id = #{rendition_id} and #{condition}");
        respond_to do |format|
            # TODO: this
            format.xml {
                @quran = {}
                @suras = []; @sura_info = [];
                verses.each { |verse|
                    if ((@suras.find { |x| x == verse.chapter_id }) == nil) then
                        @suras.push(verse.chapter_id)
                    end
                }
                for n in 0...@suras.length
                    if (@suras[n].type != Hash) then
                        @suras[n] = { :index => @suras[n] }
                    end
                end
                @suras.each { |sura|
                    verses.each { |verse|
                        verse[:number] = verse.verse_number.to_s;
                        verse[:number] = verse[:number];
=begin
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
=end
                        if (sura[:index] == verse.chapter_id) then
                            if (!sura[:name]) then
                                sura[:name] = Title.find_by_chapter_id_and_language_id(verse.chapter_id,3).name.strip
                            end
                            if (!sura[:ayas]) then
                                sura[:ayas] = Array.new
                            end
                            if ((verse.verse_number == 1) && (verse.chapter_id != 1) && (verse.chapter_id != 9)) then
                                if (!sura[:bismillah]) then
                                    bismillah = verse.content.match(/^(([^ ]+ ){4})/u)
                                    if (bismillah)
                                        sura[:bismillah] = bismillah[0].to_s.strip
                                    end
                                end
                                sura[:ayas].push({ :id      => verse[:verse_id],
                                                   :number  => verse[:number],
                                                   :text    => verse.content.gsub(/^(([^ ]+ ){4})/u,'').strip })
                            else
                                sura[:ayas].push({ :id      => verse[:verse_id],
                                                   :number  => verse[:number],
                                                   :text    => verse.content.strip })
                            end
                        end
                    }
                }
            }
        end
    end
end
