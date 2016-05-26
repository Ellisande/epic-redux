Feature: A user should be able to see a list of available meetings on the home page
  This allows users to see available meetings and jump to them.

  Scenario: Users should see a list of available meetings
    Given a summarized meeting
    When I connect to the summary server
    Then I should receive a list of available meetings
    And the list of meetings should have {1} meeting

  Scenario: If there are no meetings I shouldn't get any back
    When I connect to the summary server
    Then I should receive a list of available meetings
    And the list of meetings should have {0} meetings

  Scenario: Summary sever should broadcast new meetings
    Given a summary user
    When a new meeting named {efg} is created
    Then I should be notified of a new meeting called {efg}
    And the new meeting should have {1} participant
