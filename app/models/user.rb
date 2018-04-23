class User < ApplicationRecord
  def self.search(query)
    if query
      User.where(['name LIKE ?', "%#{query}%"])
    else
      User.all
    end
  end
end
