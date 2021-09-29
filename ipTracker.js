class IpTracker{
    constructor(){
        this.hashOfIpAddresses = {};
        this.highestTrafficIpAddresses = [];
    }
    addNewElementToList(ip_address){
        // First, we keep track of the number of time we've seen this ip_address. For that, we'll use a hash map which has a search time of O(1). Nevertheless, this datastucture will need to handle up to 2million enties, with a space complexity of O(n), wich is the best space that we may expect for this problem
        // we keep a hash map as a counter of events by ip (being an event any request of any particular IP)
        // Note: handling 2 million entries on a hash map may seem too big, but hashmaps may handle up to 2^24 entries in javascript
        if(!this.hashOfIpAddresses[ip_address]){
            this.hashOfIpAddresses[ip_address] = {
                ipAddress: ip_address,
                numberOfEvents: 0
            };
        }
        this.hashOfIpAddresses[ip_address].numberOfEvents += 1;
        //with the hash map updated, we need to update the top 100 list
        this.updateTop100(this.hashOfIpAddresses[ip_address])
    }
    updateTop100(newEntry){ //time: O(n), space: O(K)

        // check if the current IP is already in the top100, if so, erase it from the list (O(n))
        for(let i = this.highestTrafficIpAddresses.length-1; i >= 0; i--){
            let current = this.highestTrafficIpAddresses[i];
            if(current === newEntry){
                this.highestTrafficIpAddresses.splice(i, 1);
                break;
            }
        }

        // in case the list became empty after this, push the current updated value and finish
        if(this.highestTrafficIpAddresses.length === 0){
            this.highestTrafficIpAddresses.push(newEntry);
            return;
        }

        // walk through the list until finding the correct index to have a sorted list (O(n))
        let valueInserted = false;
        for(let i = this.highestTrafficIpAddresses.length-1; i >= 0; i--){
            let current = this.highestTrafficIpAddresses[i];
            // if the eventes of the element in the top 100 are less than the current entry, we need to keep looking the index for the new event
            if(current.numberOfEvents < newEntry.numberOfEvents){
                continue;
            }
            // add the current event to the i index, without erasing any neighbor
            this.highestTrafficIpAddresses.splice(i+1, 0, newEntry);
            valueInserted = true;
            break;
        }
        // we use this flag to manage the case where we reach the top of the list (index 0), without inserting the value, in that case, we sould insert it at the top
        if(!valueInserted){
            this.highestTrafficIpAddresses.splice(0, 0, newEntry);
        }
        // keep out list of length 100
        if(this.highestTrafficIpAddresses.length > 100){
            this.highestTrafficIpAddresses.pop()
        }

        return;
    }
}

let ipTracker = new IpTracker();

function request_handled(ip_address){
    ipTracker.addNewElementToList(ip_address);
}

function top100(){
    return ipTracker.highestTrafficIpAddresses;
}

function clear(){
    ipTracker = new IpTracker();
}

module.exports = {
    request_handled,
    top100,
    clear,
}
