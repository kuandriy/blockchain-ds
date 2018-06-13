# blockchain-ds

###### Simple blockchain datastracture implementation

- Initialize:  
const blockchain = require('./blockchain-ds')({complication:5});  
`complication` defines new block mining process difficulty  

- Add new block  
blockchain.addBlock({});  

- Check chain is valid:  
blockchain.isChainValid());  