Feature: Ecommerce validations
    @Regression
    Scenario: Placing the order
        Given A login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order is present in the OrderHistory

    @Error
    Scenario Outline: Login
        Given A login to Ecommerce2 application with '<username>' and '<pasword>'
        Then Verify Error message is displayed

        Examples:
            | username              | password |
            | rahulshettyacademy    | Learning  |
            | rahulshettyacademy    | Learning@830$3mK2  |