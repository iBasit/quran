=begin
just thinking here...
possible routing

chapter/1/title
chapter/1/page/1
chapter/1/verse/1
chapter/1 should render entire chapter
category.rb chapter.rb language.rb rendition_category_language.rb rendition.rb title.rb verse.rb verse_rendition.rb
=end
class ChapterController < ApplicationController


  def verses 
    @verses = Chapter.find(params[:id]).verses
    # params[:verses]
    # => verses[category] = ...
    # => verses[language] = ...
    # => verses[rendition] = ...
    respond_to do |format|
      format.xml  { render :xml => @verses }
      format.js   { render :json => @verses }
    end
  end

  # GET /chapter/new



  # GET /chapters
  # GET /chapters.xml
  def index
    @chapters = Chapter.find(:all)

    respond_to do |format|
      format.xml  { render :xml => @chapters }
      format.js   { render :json => @chapters }
    end
  end

  # GET /chapter/1
  # GET /chapter/1.xml
  def show
    @chapter = Chapter.find(params[:id])

    respond_to do |format|
      format.xml  { render :xml => @chapter }
      format.js   { render :json => @chapter }
    end
  end

  # GET /chapter/new
  # GET /chapter/new.xml
  def new
    @chapter = Chapter.new

    respond_to do |format|
      format.xml  { render :xml => @chapter }
      format.js   { render :json => @chapter }
    end
  end

  # GET /chapter/1/edit
  def edit
    @chapter = Chapter.find(params[:id])
  end

  # POST /chapters
  # POST /chapters.xml
  def create
    @chapter = Chapter.new(params[:chapter])

    respond_to do |format|
      if @chapter.save
        flash[:notice] = 'Chapter was successfully created.'
        format.xml  { render :xml => @chapter, :status => :created, :location => @chapter }
        format.js   { render :json => @chapter, :status => :created, :location => @chapter }
      else
        format.xml  { render :xml => @chapter.errors, :status => :unprocessable_entity }
        format.js   { render :json => @chapter.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /chapter/1
  # PUT /chapter/1.xml
  def update
    @chapter = Chapter.find(params[:id])

    respond_to do |format|
      if @chapter.update_attributes(params[:chapter])
        flash[:notice] = 'Chapter was successfully updated.'
        format.xml  { head :ok }
        format.js   { head :ok }
      else
        format.xml  { render :xml => @chapter.errors, :status => :unprocessable_entity }
        format.js   { render :json => @chapter.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /chapter/1
  # DELETE /chapter/1.xml
  def destroy
    @chapter = Chapter.find(params[:id])
    @chapter.destroy

    respond_to do |format|
      format.xml  { head :ok }
      format.js   { head :ok }
    end
  end
end
