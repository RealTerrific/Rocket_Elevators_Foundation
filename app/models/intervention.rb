require 'freshdesk'
require 'json'

class Intervention < ApplicationRecord
    belongs_to :author, class_name: 'Employee'
    belongs_to :employee
    belongs_to :column, optional: true
    belongs_to :customer
    belongs_to :battery
    belongs_to :elevator, optional: true
    belongs_to :building
end
