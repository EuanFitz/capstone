admin
-
admin_id
username
password
admin_email
admin_phone
company_id FK >- company.company_id

company
-
company_id
company_name
company_location

employee
-
employee_id
employee_name
employee_email
employee_phone
department_id FK >- department.department_id
company_id FK >- company.company_id

department
-
department_id
department_name

company_department
-
department_id FK >- department.department_id
company_id FK >- company.company_id

campaign
-
campaign_id
admin_id FK >- admin.admin_id
campaign_name
category_id FK >- category.category_id
department_id FK >- department.department_id
template_id FK >- template.template_id

category
-
category_id
category_name
method

results
-
campaign_id FK >- campaign.campaign_id
employee_id FK >- employee.employee_id
activity

template
-
template_id
template_name
