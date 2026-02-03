<?php
    require('global/connection.php');

//Variables
if(isset($_GET['company'])){
    $company = $_GET['company'];
    };

    if(isset($_POST['submit'])){
        if(isset($_POST['first']) && ($_POST['first'] !== '')){
            $emp_first = mysqli_real_escape_string($connection,$_POST['first']);
        }

        if(isset($_POST['last']) && ($_POST['last'] !== '')){
            $emp_last = mysqli_real_escape_string($connection,$_POST['last']);
        }

        if(isset($_POST['email']) && ($_POST['email'] !== '')){
            $emp_email = mysqli_real_escape_string($connection,$_POST['email']);
        }

        if(isset($_POST['phone'])){
            $emp_phone = mysqli_real_escape_string($connection,$_POST['phone']);
        }

        // if(isset($_POST['department'])){
        //     $emp_department = mysqli_real_escape_string($connection,$_POST['department']);
        // }

//Queries
    $newemployeequery= "INSERT INTO `employee` (`employee_id`, `employee_first`,`employee_last`, `employee_email`, `employee_phone`, `company_id`, `department_id`) VALUES (NULL, '$emp_first', '$emp_last', '$emp_email', NULLIF($emp_phone,0), '2', '2')";

    // print_r($newemployeequery);
    }

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
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main>
        <?php
            if(isset($_POST['submit'])){
                mysqli_query($connection, $newemployeequery);
            ?>
            <section>
                <h3>Completed!</h3>
                <p>Thankyou for filling out the form.</p>
                <p>You will receive a confirmation email, with a link to confirm your account.</p>
            </section>
            <section>
                <img src="logo" alt="ClickSafe">
                <h1>ClickSafe</h1>
            </section>
            <?php
            }else{
        ?>
        <section>
            <h2>Employee Regristration</h2>
                <form action="user.php" method="post"> 
                    <div>
                        <label for="first">First name</label>
                        <input type="text" name="first" id="first" placeholder="First name" required>
                    </div>
                    <div>
                        <label for="last">Last name</label>
                        <input type="text" name="last" id="last" placeholder="Last name" required>
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
                    </div>
                    <div>
                        <!-- This will be based on companies selected departments -->
                        <label for="department">Company</label>
                        <select name="company" id="company" required>
                            <option value="">Select Department</option>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                        </select>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" required>
                    </div>
                    <div>
                        <label for="phone">Phone</label>
                        <input type="tel" name="phone" id="phone" placeholder="Phone">
                    </div>

                        <button type="submit" name="submit">Sign up</button>
                </form>
        </section>
        <section>
            <img src="logo" alt="ClickSafe logo">
            <h2>Welcome to ClickSafe</h2>
            <p>This form will link your email and work numbers to your Admin or IT team. This will allow them to send phishing simulations and training information to you throughout the year. Please ensure all your details are correct before submitting. Afterwards, you will not be required to go back to this site.</p>

            <p>Thank you for using ClickSafe!</p>
        </section>
        <?php
            }
        ?>
    </main>
</body>
</html>