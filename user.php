<?php
//Variables
    $company = $_GET['company'];

    if(isset($_POST['name'])){
        $emp_name = mysqli_real_escape_string($connection,$_POST['name']);
    };
    if(isset($_POST['email'])){
        $emp_email = mysqli_real_escape_string($connection,$_POST['email']);
    };
    if(isset($_POST['phone'])){
        $emp_phone = mysqli_real_escape_string($connection,$_POST['phone']);
    };
    if(isset($_POST['company'])){
        $emp_company = mysqli_real_escape_string($connection,$_POST['company']);
    };
    if(isset($_POST['department'])){
        $emp_department = mysqli_real_escape_string($connection,$_POST['department']);
    };

//Queries
    $newemployeequery= "INSERT INTO `employee` (`employee_id`, `employee_name`, `employee_email`, `employee_phone`) VALUES (NULL, $emp_name, $emp_email, NULLIF($emp_phone,0), $emp_company, $emp_department)";

    $companyquery = "SELECT * FROM company c 
    JOIN company_department cd ON c.company_id = cd.company_id
    JOIN department d ON cd.department_id = d.department_id WHERE c.company_id = $company"
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User intake || ClickSafe.com</title>
</head>
<body>
    <form action="user.html" method="post"> 
        <div>
            <label for="name">First & Last name</label>
            <input type="text" name="name" id="name" placeholder="First & Last name" required>
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" required>
        </div>
        <div>
            <label for="phone">Phone</label>
            <input type="tel" name="phone" id="phone" required placeholder="Phone" value="0">
        </div>
        <div>

            <!-- This will be based on companies selected departments -->
            <label for="department">Department</label>
            <select name="department" id="department" required>
                <option value="">Select Department</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
            </select>

            <input type="submit" value="Sign up">
        </div>
    </form>
</body>
</html>