# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
    helper :all # include all helpers, all the time


    def index
        render :layout => 'application', :action => 'index'
    end



    # See ActionController::RequestForgeryProtection for details
    # Uncomment the :secret if you're not using the cookie session store
    # protect_from_forgery # :secret => 'c4bf4043245fdaa7dc74327f7882e3e9'
end
