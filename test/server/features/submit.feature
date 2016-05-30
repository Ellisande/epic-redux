Feature: Participants should be able to post and read topics
  Scenario: A participant should be able to post a topic
    Given a meeting {test post topic}
    And a a meeting participant
    And a topic title of {I post stuff}
    When I post a topic
    Then the topic should be posted
    And the topic posted should be mine

  Scenario: Participants should be able to see topics posted by others
    Given a meeting {test read topic}
    And a meeting participant
    When someone else posts a topic
    Then the topic should be posted

  Scenario: The host should be able to go to the next phase
    Given a meeting {test phase change}
    And a meeting participant
    And a host
    When I change the phase to {merge}
    Then the phase should be {merge}
