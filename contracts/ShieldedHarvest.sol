// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract ShieldedHarvest is SepoliaConfig {
    using FHE for *;
    
    struct HarvestPool {
        euint32 poolId;
        euint32 totalStaked;
        euint32 totalRewards;
        euint32 stakerCount;
        euint32 apy; // Annual Percentage Yield
        bool isActive;
        bool isVerified;
        string name;
        string description;
        address creator;
        uint256 startTime;
        uint256 endTime;
        uint256 lockPeriod;
    }
    
    struct Stake {
        euint32 stakeId;
        euint32 amount;
        euint32 rewards;
        address staker;
        uint256 timestamp;
        uint256 unlockTime;
        bool isActive;
    }
    
    struct YieldCalculation {
        euint32 baseYield;
        euint32 bonusYield;
        euint32 totalYield;
        bool isCalculated;
    }
    
    mapping(uint256 => HarvestPool) public pools;
    mapping(uint256 => Stake) public stakes;
    mapping(address => euint32) public stakerReputation;
    mapping(address => euint32) public poolCreatorReputation;
    mapping(uint256 => YieldCalculation) public yieldCalculations;
    
    uint256 public poolCounter;
    uint256 public stakeCounter;
    
    address public owner;
    address public verifier;
    address public treasury;
    
    event PoolCreated(uint256 indexed poolId, address indexed creator, string name);
    event StakeDeposited(uint256 indexed stakeId, uint256 indexed poolId, address indexed staker, uint32 amount);
    event StakeWithdrawn(uint256 indexed stakeId, address indexed staker, uint32 amount, uint32 rewards);
    event RewardsClaimed(uint256 indexed stakeId, address indexed staker, uint32 rewards);
    event PoolVerified(uint256 indexed poolId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event YieldCalculated(uint256 indexed poolId, uint32 baseYield, uint32 bonusYield);
    
    constructor(address _verifier, address _treasury) {
        owner = msg.sender;
        verifier = _verifier;
        treasury = _treasury;
    }
    
    function createPool(
        string memory _name,
        string memory _description,
        uint256 _lockPeriod,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Pool name cannot be empty");
        require(_lockPeriod > 0, "Lock period must be positive");
        require(_duration > 0, "Duration must be positive");
        
        uint256 poolId = poolCounter++;
        
        pools[poolId] = HarvestPool({
            poolId: FHE.asEuint32(0), // Will be set properly later
            totalStaked: FHE.asEuint32(0),
            totalRewards: FHE.asEuint32(0),
            stakerCount: FHE.asEuint32(0),
            apy: FHE.asEuint32(0), // Will be calculated based on pool performance
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            creator: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            lockPeriod: _lockPeriod
        });
        
        emit PoolCreated(poolId, msg.sender, _name);
        return poolId;
    }
    
    function stake(
        uint256 poolId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(pools[poolId].creator != address(0), "Pool does not exist");
        require(pools[poolId].isActive, "Pool is not active");
        require(block.timestamp <= pools[poolId].endTime, "Pool has ended");
        
        uint256 stakeId = stakeCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        stakes[stakeId] = Stake({
            stakeId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            rewards: FHE.asEuint32(0),
            staker: msg.sender,
            timestamp: block.timestamp,
            unlockTime: block.timestamp + pools[poolId].lockPeriod,
            isActive: true
        });
        
        // Update pool totals
        pools[poolId].totalStaked = FHE.add(pools[poolId].totalStaked, internalAmount);
        pools[poolId].stakerCount = FHE.add(pools[poolId].stakerCount, FHE.asEuint32(1));
        
        emit StakeDeposited(stakeId, poolId, msg.sender, 0); // Amount will be decrypted off-chain
        return stakeId;
    }
    
    function calculateYield(uint256 poolId) public returns (uint256) {
        require(pools[poolId].creator != address(0), "Pool does not exist");
        require(msg.sender == verifier, "Only verifier can calculate yield");
        
        // Calculate base yield based on pool performance
        euint32 baseYield = FHE.asEuint32(500); // 5% base APY
        
        // Calculate bonus yield based on staker reputation
        euint32 bonusYield = FHE.asEuint32(100); // 1% bonus APY
        
        // Total yield calculation
        euint32 totalYield = FHE.add(baseYield, bonusYield);
        
        yieldCalculations[poolId] = YieldCalculation({
            baseYield: baseYield,
            bonusYield: bonusYield,
            totalYield: totalYield,
            isCalculated: true
        });
        
        // Update pool APY
        pools[poolId].apy = totalYield;
        
        emit YieldCalculated(poolId, 0, 0); // Values will be decrypted off-chain
        return poolId;
    }
    
    function claimRewards(
        uint256 stakeId,
        externalEuint32 rewards,
        bytes calldata inputProof
    ) public {
        require(stakes[stakeId].staker == msg.sender, "Only staker can claim rewards");
        require(stakes[stakeId].isActive, "Stake is not active");
        require(block.timestamp >= stakes[stakeId].unlockTime, "Stake is still locked");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalRewards = FHE.fromExternal(rewards, inputProof);
        
        // Update stake rewards
        stakes[stakeId].rewards = FHE.add(stakes[stakeId].rewards, internalRewards);
        
        emit RewardsClaimed(stakeId, msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function withdrawStake(
        uint256 stakeId,
        externalEuint32 amount,
        externalEuint32 rewards,
        bytes calldata inputProof
    ) public {
        require(stakes[stakeId].staker == msg.sender, "Only staker can withdraw");
        require(stakes[stakeId].isActive, "Stake is not active");
        require(block.timestamp >= stakes[stakeId].unlockTime, "Stake is still locked");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalRewards = FHE.fromExternal(rewards, inputProof);
        
        // Deactivate stake
        stakes[stakeId].isActive = false;
        
        emit StakeWithdrawn(stakeId, msg.sender, 0, 0); // Amounts will be decrypted off-chain
    }
    
    function verifyPool(uint256 poolId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify pools");
        require(pools[poolId].creator != address(0), "Pool does not exist");
        
        pools[poolId].isVerified = isVerified;
        emit PoolVerified(poolId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation, bool isStaker) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (isStaker) {
            stakerReputation[user] = reputation;
        } else {
            poolCreatorReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getPoolInfo(uint256 poolId) public view returns (
        string memory name,
        string memory description,
        uint8 totalStaked,
        uint8 totalRewards,
        uint8 stakerCount,
        uint8 apy,
        bool isActive,
        bool isVerified,
        address creator,
        uint256 startTime,
        uint256 endTime,
        uint256 lockPeriod
    ) {
        HarvestPool storage pool = pools[poolId];
        return (
            pool.name,
            pool.description,
            0, // FHE.decrypt(pool.totalStaked) - will be decrypted off-chain
            0, // FHE.decrypt(pool.totalRewards) - will be decrypted off-chain
            0, // FHE.decrypt(pool.stakerCount) - will be decrypted off-chain
            0, // FHE.decrypt(pool.apy) - will be decrypted off-chain
            pool.isActive,
            pool.isVerified,
            pool.creator,
            pool.startTime,
            pool.endTime,
            pool.lockPeriod
        );
    }
    
    function getStakeInfo(uint256 stakeId) public view returns (
        uint8 amount,
        uint8 rewards,
        address staker,
        uint256 timestamp,
        uint256 unlockTime,
        bool isActive
    ) {
        Stake storage stake = stakes[stakeId];
        return (
            0, // FHE.decrypt(stake.amount) - will be decrypted off-chain
            0, // FHE.decrypt(stake.rewards) - will be decrypted off-chain
            stake.staker,
            stake.timestamp,
            stake.unlockTime,
            stake.isActive
        );
    }
    
    function getStakerReputation(address staker) public view returns (uint8) {
        return 0; // FHE.decrypt(stakerReputation[staker]) - will be decrypted off-chain
    }
    
    function getPoolCreatorReputation(address creator) public view returns (uint8) {
        return 0; // FHE.decrypt(poolCreatorReputation[creator]) - will be decrypted off-chain
    }
    
    function getYieldCalculation(uint256 poolId) public view returns (
        uint8 baseYield,
        uint8 bonusYield,
        uint8 totalYield,
        bool isCalculated
    ) {
        YieldCalculation storage calc = yieldCalculations[poolId];
        return (
            0, // FHE.decrypt(calc.baseYield) - will be decrypted off-chain
            0, // FHE.decrypt(calc.bonusYield) - will be decrypted off-chain
            0, // FHE.decrypt(calc.totalYield) - will be decrypted off-chain
            calc.isCalculated
        );
    }
    
    function emergencyWithdraw(uint256 stakeId) public {
        require(msg.sender == owner, "Only owner can emergency withdraw");
        require(stakes[stakeId].isActive, "Stake is not active");
        
        // Deactivate stake without rewards
        stakes[stakeId].isActive = false;
        
        emit StakeWithdrawn(stakeId, stakes[stakeId].staker, 0, 0);
    }
    
    function updateTreasury(address newTreasury) public {
        require(msg.sender == owner, "Only owner can update treasury");
        require(newTreasury != address(0), "Invalid treasury address");
        
        treasury = newTreasury;
    }
}
