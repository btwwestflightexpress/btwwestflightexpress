
CREATE TABLE accounts_creation.freight_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, -- Foreign key referencing the user
    Origin VARCHAR(255) NOT NULL,
    origin_street VARCHAR(255) NOT NULL,
    origin_city VARCHAR(255) NOT NULL,
    origin_state VARCHAR(255) NOT NULL,
    origin_zip_code VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    destination_street VARCHAR(255) NOT NULL,
    destination_city VARCHAR(255) NOT NULL,
    destination_state VARCHAR(255) NOT NULL,
    destination_zip_code VARCHAR(255) NOT NULL,
    package_type VARCHAR(255) NOT NULL,
    package_demension VARCHAR(255) NOT NULL,
    package_weight VARCHAR(255) NOT NULL,
    package_name VARCHAR(255) NOT NULL,
    package_number VARCHAR(255) NOT NULL,
    package_fragility VARCHAR(255) NOT NULL,
    -- Other freight details columns
    FOREIGN KEY (user_id) REFERENCES users(id)
);



-- INSERT INTO quotes.users (
--     Origin,
--     origin_street,
--     origin_city,
--     origin_state,
--     origin_zip_code,
--     destination,
--     destination_street,
--     destination_city,
--     destination_state,
--     destination_zip_code,
--     package_type,
--     package_demension,
--     package_weight,
--     package_name,
--     package_number,
--     package_fragility
--   )
-- VALUES (
--     'Mexico',
--     'Avenida Miguel Aleman',
--     'Veracruz',
--     'Veracruz',
--     '91700',
--     'Argentina:varchar',
--     'Avenida Corrientes',
--     'Buenos Aires',
--     'Buenos Aires',
--     '1043',
--     'Crate',
--     '40 * 36inches',
--     '22.7kg',
--     'avarenzos package',
--     '1',
--     'none-fragile'
--   );



  -- INSERT INTO accounts_creation.users (username, email, password)
  -- VALUES (
  --     'rexxy',
  --     'rexxyofkeez@gmail.com',
  --     'rexxy'
  --   );




    -- UPDATE accounts_creation.users SET password = 'hashed_password' WHERE id = 1;
    --     UPDATE accounts_creation.users SET password = 'hashed_password' WHERE id = 2;
    --         UPDATE accounts_creation.users SET password = 'hashed_password' WHERE id = 8;






