# module LanguageUrls
#   class Generator < Jekyll::Generator
#     safe true
#     priority :high

#     def generate(site)
#       site.collections['posts'].docs.each do |post|
#         if post.data['lang']
#           post.data['permalink'] = "/#{post.data['lang']}/blog/:slug/"
#         end
#       end

#       site.pages.each do |page|
#         if page.data['lang'] && !page.url.start_with?("/#{page.data['lang']}/")
#           page.data['permalink'] = "/#{page.data['lang']}#{page.url}"
#         end
#       end
#     end
#   end
# end