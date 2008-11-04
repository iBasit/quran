xml.instruct!
xml.quran do
    for s in @suras
        xml.sura({ 
            :index => s[:index],
            :title => s[:name]
        }) do
            if (s[:bismillah]) then
                xml.bismillah  s[:bismillah]
            end
            for a in s[:ayas]
                xml.aya({ 
                    :id    => a[:id],
                    :index => a[:number]
                }) do
                    xml.text! a[:text]
                end
            end
        end
    end
end
