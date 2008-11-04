class JsonController < ApplicationController
    def get
        params.each { |parameter|
            key   = parameter[0];
            value = ActiveSupport::JSON.decode(parameter[1]);
            case key
                when 'select_rendition':
                    json = Hash.new();
                    value.each { |value| 
                        case value
                            when 'arabic' : json[value] = Rendition.find_by_sql("select rendition_id, name from rendition where rendition_id in (select rendition_id from rendition_category_language where language_id=1 and category_id=1)");
                            when 'tafseer': json[value] = Rendition.find_by_sql("select rendition_id, name from rendition where rendition_id in (select rendition_id from rendition_category_language where language_id=1 and category_id=2)");
                            when 'english': json[value] = Rendition.find_by_sql("select rendition_id, name from rendition where rendition_id in (select rendition_id from rendition_category_language where language_id=2 and category_id=3)");
                        end
                    };
                    respond_to { |format|
                        format.js { render :json => json }
                    };
                when 'main_menu':
                    json = Array.new;
                    value.each { |value|
                        case value
                            when 'category' :
                                items = Array.new;
                                json.push({ :text => 'Category', :checked => false, :menu => { :items => items } });
                                Category.find_by_sql("select * from category").each { |category|
                                    languages = Array.new;
                                    Category.find(category.category_id).language.each { |language|
                                        add = (languages.find { |lang| lang.language_id == language.language_id } == nil);
                                        if (add)
                                            languages.push(language);
                                        end
                                    };
                                    language_items = Array.new;
                                    languages.each { |language|
                                        rendition_items = Array.new;
                                        Rendition.find_by_sql("select * from rendition, rendition_category_language where rendition.rendition_id=rendition_category_language.rendition_id and rendition_category_language.category_id=#{category.category_id} and rendition_category_language.language_id=#{language.language_id}").each { |rendition|
                                            rendition_items.push({ :rendition_id => rendition.rendition_id, :text => rendition.name, :checked => false });
                                        };
                                        language_items.push({ :language_id => language.language_id, :text => language.name, :checked => false, :menu => ((rendition_items.length > 0)? { :items => rendition_items } : false ) });
                                    };
                                    items.push({ :category_id => category.category_id, :text => category.name, :checked => false, :menu => ((language_items.length > 0)? { :items => language_items } : false ) });
                                };
                            when 'language' :
                                items = Array.new;
                                json.push({ :text => 'Language', :checked => false, :menu => { :items => items } });
                                Language.find_by_sql("select * from language").each { |language|
                                    items.push({ :language_id => language.language_id, :text => language.name, :checked => false });
                                };
                        end
                    };
                    respond_to { |format|
                        format.js { render :json => json }
                    };
                else
                    ;
            end
        };
=begin
        if (params[:obj] === 'select_arabic')
            result = Rendition.find_by_sql("select rendition_id, name from rendition where rendition_id in (select rendition_id from rendition_category_language where language_id=1 and category_id=1)");
        elsif (params[:obj] === 'select_english')
            result = Rendition.find_by_sql("select rendition_id, name from rendition where rendition_id in (select rendition_id from rendition_category_language where language_id=2 and category_id=3)");
        elsif (params[:obj] === 'select_tafseer')
            result = Rendition.find_by_sql("select rendition_id, name from rendition where rendition_id in (select rendition_id from rendition_category_language where language_id=1 and category_id=2)");
        end

        if (result)
            @obj[params[:obj]] = result;
        end
=end
    end
end
