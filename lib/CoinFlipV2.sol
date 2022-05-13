
/**
 *Submitted for verification at BscScan.com on 2021-08-24
*/

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

pragma solidity ^0.8.0;



library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;

        return c;
    }

}
pragma solidity ^0.8.0;
pragma abicoder v2;


/**
 * @title CoinFlipPrediction
 */
contract CoinFlipPredictionV2 is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {

    using SafeERC20Upgradeable for IERC20Upgradeable;
    using SafeMath for uint256;
    address public player1;
    bytes32 public player1Commitment;

    uint256 public betAmount;

    address public player2;
    bool public player2Choice;
    uint256 player2Betamount;
    address mgToken;
    address GAS_FEE_WALLET_ADDRESS;
    uint256 public  PERCENTS_DIVIDER ;
    uint256 public  PROJECT_FEE ;
    uint256 public houseTotalFee;
    uint256 public expiration;

    event BetPlaced(address indexed sender, bool, uint256 amount);
    event GameMessage(string mesg);
    uint256 public totalRound;
    uint256 public headWins;
    uint256 public tailsWins;
    mapping (uint256 => Round) public allRounds;    
    mapping (address => User) public allUsers;
    mapping (uint256 => Round) public luckyRangeRounds;
    uint256 public totalLuckyRangeRound;

    struct Round {
        uint256 player2BetAmount;
        bool player2BetChoice;
        bool winningPosition;
        address winnerAddress;
        address player2Address;
        string txnHash;
        uint256 luckyRangeBet;
        uint256 luckyNumber;
    }    
    struct User {
        uint256 bonus;
    }

    mapping (address => bytes32) public secretKeys;

    function _authorizeUpgrade(address) internal override onlyOwner {}    

    function takeBet(address _player2Address,bool choice, uint256 _betAmount, bytes32 commitment, bool _secretchoice, uint256 nonce, string memory _txnHash) external  {
        //require(player2 == 0);
        // require(msg.value >= minBetAmount, "Bet amount must be greater than minBetAmount");
        require(msg.sender == GAS_FEE_WALLET_ADDRESS, "No Intruder allowed");
        
        player1Commitment=commitment;
        player1 = address(this);
        //IERC20(mgToken).safeTransferFrom(_player2Address,address(this),_betAmount);
        totalRound++;
        Round storage r=allRounds[totalRound];
        r.player2BetAmount=_betAmount;
        r.player2Address=_player2Address;
        r.player2BetChoice=choice;
        r.winningPosition=_secretchoice;
        r.winnerAddress=address(this);
        r.txnHash=_txnHash;
        expiration = block.timestamp + 24 hours;        
        emit BetPlaced(r.player2Address, r.player2BetChoice, r.player2BetAmount);

        require(keccak256(abi.encodePacked(_secretchoice, nonce))== player1Commitment);

            if(r.winningPosition==true){
                headWins++;
            }
            if(r.winningPosition==false){
                tailsWins++;
            }          
            if (r.player2BetChoice == _secretchoice) {
                r.winningPosition=r.player2BetChoice;
                r.winnerAddress=r.player2Address;
                User storage u=allUsers[r.player2Address];
                u.bonus=u.bonus.add(r.player2BetAmount.mul(2));
                emit GameMessage("You win. check your wallet");
            } else {
                emit GameMessage("You lost. try again");
            }
            allRounds[totalRound]=r;        
         }

    function luckyRange(address _player2Address, uint256 _betAmount, uint256 playerBetRange, uint256 luckyNumber, string memory _txnHash, uint256 playerPayout, bool playerFlag, uint256 payoutDivider, bytes32 secretKeyGen) external{
        require(secretKeys[_player2Address]!="0x1", "No Intruder allowed");
        require(secretKeys[_player2Address]==secretKeyGen, "No Intruder allowed");
        IERC20Upgradeable(mgToken).transferFrom(msg.sender,address(this),_betAmount);
        totalLuckyRangeRound++;
        Round memory luckyRound=luckyRangeRounds[totalLuckyRangeRound];
        luckyRound.player2BetAmount=_betAmount;
        luckyRound.player2Address=_player2Address;
        luckyRound.luckyRangeBet=playerBetRange;
        luckyRound.luckyNumber=luckyNumber;
        luckyRound.txnHash=_txnHash;
        luckyRangeRounds[totalLuckyRangeRound]=luckyRound;
        if (playerFlag == true) {
            User memory luckyPlayer=allUsers[_player2Address];
            playerPayout=playerPayout.div(payoutDivider);
            luckyPlayer.bonus=luckyPlayer.bonus.add(luckyRound.player2BetAmount.mul(playerPayout));
            allUsers[_player2Address]=luckyPlayer;
            emit GameMessage("You win. check your wallet");
        } else {
            emit GameMessage("You lost. try again");
        }  
        secretKeys[_player2Address]="0x1";
        
    }         

    function _secretKeys (address _player2Address, bytes32 secretKey) external {
        require(msg.sender == GAS_FEE_WALLET_ADDRESS, "No Intruder allowed");
        secretKeys[_player2Address]=secretKey;
    } 

    function claim() external{
        uint256 fee = allUsers[msg.sender].bonus.mul(PROJECT_FEE).div(PERCENTS_DIVIDER);
        houseTotalFee= houseTotalFee + fee;
        uint256 userBonus=allUsers[msg.sender].bonus.sub(fee);
        // IERC20(mgToken).transfer(msg.sender,allUsers[msg.sender].bonus);
        IERC20Upgradeable(mgToken).transfer(msg.sender,userBonus);
        User storage u2=allUsers[msg.sender];
        u2.bonus=0;
        allUsers[msg.sender]=u2;
    }

    function getBalance(IERC20Upgradeable tokenAddress) external view returns (uint256){
          return tokenAddress.balanceOf(address(this));
    }


    function transferERC20() public onlyOwner {
        
        uint256 erc20balance = IERC20Upgradeable(mgToken).balanceOf(address(this));
        IERC20Upgradeable(mgToken).transfer(msg.sender,erc20balance);
        
    }     


}