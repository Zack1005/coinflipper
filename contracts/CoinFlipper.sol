contract CoinFlipper {

    address house;
    int lastgainloss;
    string lastresult;
    uint lastblocknumberused;
    bytes32 lastblockhashused;
    uint128 bidmoney;
    address gambler;
    
    function CoinFlipper() 
    {
        house = msg.sender;                               
        lastresult = "no balance in contract";
        lastgainloss = 0;
        bidmoney=0;
    }
    
    function HouseBetting() public payable {
        if (house!=msg.sender){
            lastresult="only the creater can use this function";
        }
        bidmoney=bidmoney+uint128(msg.value);
    }
    
    function getEndowmentBalance() constant returns (uint)
    {
        return bidmoney;
    }
    
   
    function sha(uint128 wager) constant private returns(uint256)   // DISCLAIMER: This is pretty random... but not truly random.
    { 
        return uint256(sha3(block.difficulty, block.coinbase, now, lastblockhashused, wager));  
    }
    
    function betAndFlip(uint256 betnumber) public payable              
    {
        if(msg.value > 340282366920938463463374607431768211455)     // value can't be larger than (2^128 - 1) which is the uint128 limit
        {
            lastresult = "you cannot bet larger than 2^128 - 1";
            lastgainloss = 0;
            msg.sender.send(msg.value); // return wager
            return;
        }         
        else if((msg.value) > bidmoney)                     // contract has to have 2*wager funds to be able to pay out. (current balance INCLUDES the wager sent)
        {
            lastresult = "the contract cannot pay due to lacking of balance";
            lastgainloss = 0;
            msg.sender.send(msg.value); // return wager
            return;
        }
        else if (msg.value == 0)
        {
            lastresult = "you should put some money in ";
            lastgainloss = 0;
            // nothing wagered, nothing returned
            return;
        }else if(betnumber!= uint256(0) && betnumber!=uint(1) ){
            lastresult= "the number you bet can either be 1 or 0";
            lastgainloss = 0;
            return ;
        }
        gambler=msg.sender;
        uint128 wager = uint128(msg.value);                         // limiting to uint128 guarantees that conversion to int256 will stay positive
        lastblocknumberused = block.number - 1 ;
        lastblockhashused = block.blockhash(lastblocknumberused);
        uint128 lastblockhashused_uint = uint128(lastblockhashused) + wager;
        uint hashymchasherton = sha(lastblockhashused_uint);
        
        if( hashymchasherton % 2 != betnumber )
        {
            lastgainloss = int(wager) * -1;
            lastresult = "gambler loses";
            // they lost. Return nothing.
            house.send(wager*2);
        }
        else
        {
            lastgainloss = wager;
            lastresult = "gambler wins";
            msg.sender.send(wager * 2);  // They won. Return bet and winnings.
        }       
        bidmoney=bidmoney-wager;
        
    }
    
    function getGambler() constant returns(address){
        return gambler;
    }
    
    function getHouse() constant returns(address){
        return house;
    }
    
    function getLastBlockNumberUsed() constant returns (uint)
    {
        return lastblocknumberused;
    }
    
    function getLastBlockHashUsed() constant returns (bytes32)
    {
        return lastblockhashused;
    }

    function getResultOfLastFlip() constant returns (string)
    {
        return lastresult;
    }
    
    function getPlayerGainLossOnLastFlip() constant returns (int)
    {
        return lastgainloss;
    }
        
    /**********
     Standard kill() function to recover funds 
     **********/
    
    function kill()
    { 
        if (msg.sender == house)
            suicide(house);  // kills this contract and sends remaining funds back to house
    }
}