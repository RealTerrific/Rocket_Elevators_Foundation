require 'freshdesk'
require 'json'

class Intervention < ApplicationRecord
    belongs_to :author, class_name: 'Employee'
    belongs_to :employee
    belongs_to :column
    belongs_to :customer
    belongs_to :battery
    belongs_to :elevator
    belongs_to :building
    after_create :freshdesk
end
