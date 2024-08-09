// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error DesToken__NotOwner();

/**
 * @title DesToken
 * @author Stephen Ngwu
 */
contract DesToken is ERC20 {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;
    address private immutable admin;

    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;

        _status = _NOT_ENTERED;
    }

    modifier onlyOwner() {
        // require(msg.sender == owner);
        if (msg.sender != admin) revert DesToken__NotOwner();
        _;
    }

    constructor() ERC20("DesToken", "DTN") {
        _mint(msg.sender, 1000000 * 10 ** 18);
        admin = msg.sender;
    }

    /**
     * @dev Creates `amount` tokens and assigns them to `account`
     * Only addresses the creator of the contract can perform this task
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev transfer token to an account
     * called when an address(user) gains tokens from the app
     */
    function tokenTransfer(
        address to,
        uint256 amount
    ) public onlyOwner nonReentrant {
        _transfer(admin, to, amount);
    }

    /**
     * @dev When a user wants to gift a token to another user
     */
    function sendToken(address to, uint256 amount) public nonReentrant {
        transfer(to, amount);
    }

    /**
     * @dev get the token balance of the given account
     * @return uint256
     */
    function getBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }
}
