# Dependencies

- node >= 16.6.2

# Quick start
Open a terminal and follow these instructions:

```sh
# clone the repo
git clone https://github.com/danisaurio/evisit-exam.git

# install the dependencies of the project
npm i

# run the server!
npm test
```

## Available Scripts

In the project directory, you can run:

### `npm test`

Launches unit tests

## The challenge:
    Imagine your team has developed a web service that receives requests from about 20 million unique IP addresses every day. You want to keep track of the IP addresses that are making the most requests to your service each day. Your job is to write a program that (1) tracks these IP addresses in memory (don’t use a database), and (2) returns the 100 most common IP addresses.

    In the language of your choice, please implement these functions:

        request_handled(ip_address)
            This function accepts a string containing an IP address like “145.87.2.109”. This function will be called by the web service every time it handles a request. The calling code is outside the scope of this project. Since it is being called very often, this function needs to have a fast runtime.

        top100()
            This function should return the top 100 IP addresses by request count, with the highest traffic IP address first. This function also needs to be fast. Imagine it needs to provide a quick response (< 300ms) to display on a dashboard, even with 20 millions IP addresses. This is a very important requirement. Don’t forget to satisfy this requirement.

        clear()
            Called at the start of each day to forget about all IP addresses and tallies.

## NOTES:
 ### What would you do differently if you had more time?
     I think that the 2 for loops are pretty similar so I feel there must be a way to unite them and interate through the list just one 
     time, not two, I would keep trying to do that if I had mode time. Also, i'd add more test cases
 ### What is the runtime complexity of each function?
     request_handled => O(n)
     top100 => O(1)
     clear => O(1)
 ### How does your code work?
     I'm using a class that has 2 properties, hashOfIpAddresses that is a hash map that keeps track of addresses and number of requests made by
     each and highestTrafficIpAddresses, that keeps track of the top 100 address with mosts requests
     The complex part of the implementation is a method of the ipTracker class called 'updateTop100' that, on each new request, updated the 'top100' list,
     to do that, instear of sorting all its values in nlogn complexity, it trusts on the fact that the list is always sorted and just
     looks for "the right place" for this new value to be inserted. Also, it drops the last value if the list is over 100 elements
      with this approach I was able to keep a complexity on O(n)
 ### What other approaches did you decide not to pursue?
     I tried to use a BST, but I run into 2 possible approaches: order by IP by its ascii value (but then getting the top100 would be expensive) or ordering by
     the number of requests (wich woulkd lead to duplicated keays and would make adding a new node really cumbersome). Also, I thought about using a minHeap
     but in that approach I'd have trouble when, for example, the 2 last values are the same, I'd always be replacing the very last value, but not
     cheking the next ones
 ### How would you test this?
     I'd like to mock a service that makes over 20mill requests (load test) and would make some unit tests that make sure that the sensitive methods
     (request_handled and top100) keep performing under a certain threshold (<300ms) even if new changes are introduced


