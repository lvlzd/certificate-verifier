// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {

    address public owner;

    struct Certificate {
        string studentName;
        string courseName;
        bool exists;
        bool revoked;
        string revokeReason;
    }

    mapping(uint256 => Certificate) public certificates;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCertificate(
        uint256 certificateId,
        string memory studentName,
        string memory courseName
    ) public onlyOwner {

        require(
            !certificates[certificateId].exists,
            "Certificate already exists"
        );

        certificates[certificateId] = Certificate(
            studentName,
            courseName,
            true,
            false,
            ""
        );
    }

    function revokeCertificate(
        uint256 certificateId,
        string memory reason
    ) public onlyOwner {

        require(
            certificates[certificateId].exists,
            "Certificate does not exist"
        );

        certificates[certificateId].revoked = true;
        certificates[certificateId].revokeReason = reason;
    }

    function verifyCertificate(
        uint256 certificateId
    ) public view returns (bool exists, bool revoked) {

        return (
            certificates[certificateId].exists,
            certificates[certificateId].revoked
        );
    }
}