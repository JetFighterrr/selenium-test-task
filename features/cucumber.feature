Feature: Test Task
  As a user of Google
  I want to make sure it works proper
  So that I can use ad hoc tests

  Background:
    Given there is connection to Google

  Scenario: Add operation
    When I start with 1
    And I add 2
    And I press result
    Then I see 3 as a result

  Scenario: Subtract operation
    When I start with 5
    And I subtract 4
    And I press result
    Then I see 1 as a result

  Scenario: Multiply operation
    When I start with 6
    And I multiply by 7
    And I press result
    Then I see 42 as a result

  Scenario: Divide operation
    When I start with 9
    And I divide by 3
    And I press result
    Then I see 3 as a result

  Scenario: Pointer check
    When I start with 0
    And I use pointer and 5
    And I multiply by 8
    And I press result
    Then I see 4 as a result