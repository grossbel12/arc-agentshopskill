// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract SkillShop {
    address public owner;
    address public usdcToken;
    uint256 public listingFee = 1_000_000_000;

    struct Skill {
        uint256 id;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Skill) public skills;
    mapping(address => mapping(uint256 => bool)) public hasPurchased;
    mapping(address => bool) public hasListingAccess;

    event SkillPurchased(address indexed buyer, uint256 indexed skillId, uint256 price);
    event ListingFeePaid(address indexed seller, uint256 price);

    constructor(address _usdc) {
        owner = msg.sender;
        usdcToken = _usdc;

        skills[1] = Skill(1, 100_000, true);
        skills[2] = Skill(2, 100_000, true);
        skills[3] = Skill(3, 100_000, true);
        skills[4] = Skill(4, 100_000, true);
    }

    function purchase(uint256 skillId) external {
        Skill memory skill = skills[skillId];
        require(skill.active, "Skill not active");

        bool ok = IERC20(usdcToken).transferFrom(msg.sender, owner, skill.price);
        require(ok, "USDC transfer failed");

        hasPurchased[msg.sender][skillId] = true;

        emit SkillPurchased(msg.sender, skillId, skill.price);
    }

    function payListingFee() external {
        bool ok = IERC20(usdcToken).transferFrom(msg.sender, owner, listingFee);
        require(ok, "Listing fee transfer failed");

        hasListingAccess[msg.sender] = true;

        emit ListingFeePaid(msg.sender, listingFee);
    }

    function checkPurchase(address buyer, uint256 skillId) external view returns (bool) {
        return hasPurchased[buyer][skillId];
    }
}
