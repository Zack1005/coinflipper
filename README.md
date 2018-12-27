## 选题背景

这是一个掷硬币的博彩dapp。庄家（house）部署一个合约，并且向合约账户中转账以后，闲家（gambler）可以向该合约进行下注，并且输入猜测结果，如果胜利，则会获得双倍的奖金。否则，奖金归庄家所有。

区块链技术在一些普通的技术上实际上有很多缺陷。比如生成随机数。以太坊网络中的每个节点都需要在各自的 中执行代码，EVM 的执行结果必须有严格的确定性，所有节点必须得到同样的运行结果 这就对智能合约以及 EVM 造成一定的局限性，智能合约目前仍无法实现 些可能会带来不确定结果的简单操作，如生成随机数、调用操作系统 PI 等，因为这些操作会因时间、系统等执行环境的差异而产生不同的结果，进而使以太坊节点无法对区块中的账户状态达成共识。

所以关键在解决如何随机数的生成这样。我才用的方法是，根据已经生成的区块，对它们的哈希进行某种计算，然后模以2。这样就把最终的结果限制为了0和1，分别代表head和tail

## 合约解释

### Variables

由于之前合约部署的时候有一些疏忽，我把合约的一些接口按照交互更方便的原则进行了修改。

![TIM图片20181227135651](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181227135651.png)

- house，是合约的部署者
- lastgainloss表示上一次的得失
- lastresult表示上一个结果
- lastblocknumberused表示上一个区块的编号
- lastblockhashused表示上一个区块的好戏
- bidmoney表示合约中有的余额
- gambler表示gambler

### Housebetting

![TIM图片20181227140116](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181227140116.png)

是用来给house进行下注的函数

### BetAndFlip

![1545890601658](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181227140301.png)

这是给gambler用的下注以及竞猜的接口。gambler需要向函数输入betnumber变量，表示猜的是0还是1，接下来，首先是要判断gambler下注是否超过2^128-1，其次判断是否比账户余额要多，记下来判断是否有下注，最后判断输入的变量是否合法（0或者1）。

wager变量表示的是gambler输入的下注金额。

接下来，首先获得上一个block的编号，然后获得上一个的hash。用上一个block的hash加上下注金额生成一个随机数，然后模以2，就获得了最终结果。

然后将合约中的余额减去gambler下注金额即可。



## 项目准备

### Preinstallation

truffle

ganache

metamask

```
git clone https://github.com/Zack1005/coinflipper.git

npm install -g webpack webpack-cli

npm install
```

### 启动Ganache

Ganache自动生成了十个账号

![TIM图片20181224000023](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224000023.png)

下面可以看到seed word，这里等会我们用metamask的时候会用得上。

![TIM图片20181224000113](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224000113.png)



### 启动Metamask

metamask是一款dapp的电子钱包，可以在谷歌的扩展程序中下载到。

登陆的时候选择import seedword，然后把上面的那一串复制过去就可以了

![TIM图片20181224001132](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224001132.png)

然后我们在右上角网络选择这里选择custom RPC，然后输入下面这个地址和端口号，这样就和我们的ganache连起来了。

![TIM图片20181224001045](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224001045.png)

我们创造两个账户，一个作为Gambler，一个作为House。这个地方虽然说是创造，但是实际上就是ganache生成的前两个。

![TIM图片20181224001425](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224001425.png)

### 编译与部署

进入主目录以后

`truffle compile`

`truffle migrate --reset`

![TIM图片20181224002247](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224002247.png)

这个时候可以看到ganache第一个账号部署了一个合约，eth有略微减少。

![TIM图片20181224002318](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224002318.png)

![TIM图片20181224002347](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224002347.png)

这就说明我们的House账号已经部署好了一个合约。

### 启动服务器

`npm run start`

我们在浏览器localhost:8080即可看到我们的博彩网站。

![TIM图片20181227112026](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181227112026.png)

## 使用说明

为了简单起见，我将每个人的赌注设置为了1-3eth，House先下注（也就是向合约中转账，相当于形成了一个资金池）。

**注意，如果是庄家下注，则需要在Metamask中切换到庄家的账户。否则会因为发起交易的账号与登陆的账号不匹配导致无法交易**

![TIM图片20181224003836](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224003836.png)

接下来点击下注

![TIM图片20181224003902](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224003902.png)

然后就会看到电子钱包收到一个请求确认

![TIM图片20181224004139](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224004139.png)

confirm之后，这笔tx就完成了。

![TIM图片20181224005149](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224005149.png)

可以在Ganache上看见详细信息。

接下来一样的操作，记得在metamask上把账号切换到gambler

![TIM图片20181224005339](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224005339.png)

点击按钮后自动生成最终结果，我们可以看到House和Gambler的账户余额都出现了变化。

![TIM图片20181224005519](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224005519.png)

由于有手续费，所以会有0.1左右的差距，但是House基本上等于99，Gambler基本等于101，也就是说这一局是gambler获胜。

**另外，在最终版本中，是需要用户自己输入账号，并且在Metamask登陆自己的账号的。并且一定要注意，当前Metamask登陆的账号与点击按钮的账号需要一致。比如说House Account输入的A，那么在Metamask也必须要登陆A，否则将无法把交易信息发送过来**

**如果只是测试用的话，建议打开Metamask，将已有的账号复制到输入框中**

最终版如下图

![TIM图片20181227112026](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181227112026.png)

## 测试

### 当gambler下注为0

![TIM图片20181224112315](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224112315.png)

![TIM图片20181224112353](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224112353.png)

可以看到会提示应该放一些赌资进去。同时，gambler的账户余额会减少，是因为有一定的手续费。

![TIM图片20181224110445](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224110445.png)

### 当Gambler下注大于资金池

会显示资金池资金不够

![TIM图片20181224112421](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224112421.png)

同时House的下注仍然在资金池中，Gambler下注的钱会返回到账户中。

![TIM图片20181224112436](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224112436.png)

### 当Gambler下注正确

会看到显示最终的结果，gambler输了的话钱就会自动转入House的账户中。

![TIM图片20181224112502](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224112502.png)

![TIM图片20181224112518](https://github.com/Zack1005/coinflipper/blob/master/procedure/TIM图片20181224112518.png)

