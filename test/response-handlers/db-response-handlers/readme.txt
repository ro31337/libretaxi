This directory contains tests that require database connection. AVA runs each
test file in its own process (and in parallel). So for each individual test file
in this directory we need to kickoff mock database on specific port.

There are many ways of doing that like:

* Kickoff one mock database for all tests. Tradeoff of this approach is that
  one database will be polluted with the data from all other tests.

* Mock database connection. Solution was found, but it was not simple, and
  it looked like over-engineering. Can be investigated more.

* Create multiple directories with its own .env files. It is simple and better
  than clever.

So in this directory you'll find tests that require database connection. For
each of the test new database mock server will be kicked off on the port
specified in test file.
