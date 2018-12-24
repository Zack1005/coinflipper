
# CoinFlipper - 
This is basically about how to generate a random number. 

## 选题背景

这是一个掷硬币的博彩dapp。庄家（house）部署一个合约，并且向合约账户中转账以后，闲家（gambler）可以向该合约进行下注，并且输入猜测结果，如果胜利，则会获得双倍的奖金。否则，奖金归庄家所有。

区块链技术在一些普通的技术上实际上有很多缺陷。比如生成随机数。以太坊网络中的每个节点都需要在各自的 中执行代码，EVM 的执行结果必须有严格的确定性，所有节点必须得到同样的运行结果 这就对智能合约以及 EVM 造成一定的局限性，智能合约目前仍无法实现 些可能会带来不确定结果的简单操作，如生成随机数、调用操作系统 PI 等，因为这些操作会因时间、系统等执行环境的差异而产生不同的结果，进而使以太坊节点无法对区块中的账户状态达成共识。

所以关键在解决如何随机数的生成这样。我才用的方法是，根据已经生成的区块，对它们的哈希进行某种计算，然后模以2。这样就把最终的结果限制为了0和1，分别代表head和tail

## Preparation

### Preinstallation

truffle

ganache

metamask

```
git clone https://github.com/Zack1005/coinflipper.git

npm install -g webpack webpack-cli

npm install
```

### 启动

启动metamask，启动ganache，把metamask连接到ganache以后，运行下面的命令

```
truffle compile

truffle migrate --reset

npm run start
```

