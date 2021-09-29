const { expect } = require('chai');
const { request_handled, top100, clear } = require( './ipTracker');

describe('request_handled', () => {
    beforeEach(()=>{
        clear()
    })
    it('should track an IP', () => {
        let testIp = "192.168.0.0"
        request_handled(testIp);
        expect(top100()).to.deep.equal([{ipAddress: testIp, numberOfEvents: 1}]);
    });
    it('should track an IP address twice', () => {
        let testIp = "192.168.0.0"
        request_handled(testIp);
        request_handled(testIp);
        expect(top100()).to.deep.equal([{ipAddress: testIp, numberOfEvents: 2}]);
    });
    it('should track different IP address', () => {
        let testIp = "192.168.0.0"
        let testIp2 = "192.168.0.1"
        let expectedResult = [
            {
                ipAddress: testIp, 
                numberOfEvents: 2
            },
            {
                ipAddress: testIp2, 
                numberOfEvents: 1
            }
        ]
        request_handled(testIp);
        request_handled(testIp);
        request_handled(testIp2);
        expect(top100()).to.deep.equal(expectedResult);
    });
    it('should handle over 100 cases', () => {
        for (let sufix = 1; sufix <= 250; sufix++) {
            let ipAddress = "192.168.0." + String(sufix);
            for (let times = 0; times < sufix; times++) {
                request_handled(ipAddress);
            }
        }
        expect(top100().length).to.equal(100);
        expect(top100()[0].ipAddress).to.equal("192.168.0.250")
        expect(top100()[99].ipAddress).to.equal("192.168.0.151")
    })
});
