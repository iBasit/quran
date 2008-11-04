ActionController::Routing::Routes.draw do |map|
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  #   map.resources :products
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller
  #   map.resources :products do |products|
  #     products.resources :comments
  #     products.resources :sales, :collection => { :recent => :get }
  #   end
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end
  # map.root :controller => "welcome"
  map.root :controller => "quran"
  map.resource :page
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
