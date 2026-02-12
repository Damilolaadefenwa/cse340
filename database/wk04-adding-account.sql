-- Wk04- ACTIVITY INSTUCTION
--Save this there for Rebuild of Database Purpose
-- Register three new accounts with the following information using your registration form:
-- 1A. Insert Basic Client
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Basic',
        'Client',
        'basic@340.edu',
        'I@mABas1cCl!3nt'
    );
-- 1B. Insert Happy Employee
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Happy',
        'Employee',
        'happy@340.edu',
        'I@mAnEmpl0y33'
    );
-- 1B. Insert Manager User
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Manager',
        'User',
        'manager@340.edu',
        ' I@mAnAdm!n1strat0r'
    );
--Login to your database and change the account_type of the Employee account to "Employee"
--and account_type of the Manager account to "Admin".
-- 2A. Modify Happy Employee to "Employee"
UPDATE public.account
SET account_type = 'Employee'
WHERE account_firstname = 'Happy'
    AND account_lastname = 'Employee';
-- 2B. Modify Manager User to "Admin"
UPDATE public.account
SET account_type = 'Admin'
WHERE account_firstname = 'Manager'
    AND account_lastname = 'User';