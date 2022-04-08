class CreateInterventions < ActiveRecord::Migration[5.2]
  def change
    create_table :interventions do |t|
      t.datetime :startdate
      t.datetime :enddate
      t.string :result
      t.string :report
      t.string :status

      t.timestamps
    end
  end
end
