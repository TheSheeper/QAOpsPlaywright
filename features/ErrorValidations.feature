Feature: Error Validation
    @Error
    Scenario Outline: Login
        Given A login to Ecommerce2 application with '<username>' and '<pasword>'
        Then Verify Error message is displayed

        Examples:
            | username              | password |
            | rahulshettyacademy    | Learning  |
            | rahulshettyacademy    | Learning@830$3mK2  |


#Parameretization, praralle, html, rerun failed