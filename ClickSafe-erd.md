admin
-
admin_id SMALLINT
username VARCHAR(100)
password VARCHAR(50)
admin_email VARCHAR(150)
admin_phone VARCHAR(15)
company_id SMALLINT FK >- company.company_id

company
-
company_id SMALLINT
company_name VARCHAR(150)
company_location VARCHAR(56)

employee
-
employee_id INT
employee_name VARCHAR(95)
employee_email VARCHAR(150)
employee_phone VARCHAR(15)
department_id SMALLINT FK >- department.department_id
company_id SMALLINT FK >- company.company_id

department
-
department_id SMALLINT
department_name VARCHAR(50)

company_department
-
department_id SMALLINT FK >- department.department_id
company_id SMALLINT FK >- company.company_id

campaign
-
campaign_id INT
admin_id SMALLINT FK >- admin.admin_id
campaign_name VARCHAR(100)
start_date DATETIME
end_date DATETIME
category_id TINYINT FK >- category.category_id
department_id SMALLINT FK >- department.department_id
template_id SMALLINT FK >- template.template_id
status VARCHAR(20)

category
-
category_id TINYINT
category_name VARCHAR(50)
method VARCHAR(200)

results
-
campaign_id SMALLINT FK >- campaign.campaign_id
employee_id INT FK >- employee.employee_id
activity BOOLEAN

template
-
template_id SMALLINT 
template_name VARCHAR(100)
template_filename VARCHAR(100)