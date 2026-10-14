const verifyButton = document.getElementById("verifyButton");
const certificateIdInput = document.getElementById("certificateId");

const result = document.getElementById("result");

const status = document.getElementById("status");
const statusBadge = document.getElementById("statusBadge");

const studentName = document.getElementById("studentName");
const courseName = document.getElementById("courseName");

const reasonRow = document.getElementById("reasonRow");
const reason = document.getElementById("reason");


const certificates = {

    "101": {
        student: "Lala Valizada",
        course: "Blockchain Technology",
        status: "valid"
    },

    "102": {
        student: "David Miller",
        course: "Software Development Methodologies",
        status: "valid"
    },

    "103": {
        student: "Emma Wilson",
        course: "Web Technologies",
        status: "valid"
    },

    "202": {
        student: "Anna Smith",
        course: "Web Technologies",
        status: "revoked",
        reason: "Certificate holder deceased"
    },

    "203": {
        student: "Michael Brown",
        course: "Blockchain Technology",
        status: "revoked",
        reason: "Certificate issued by mistake"
    },

    "204": {
        student: "Sophia Davis",
        course: "Software Development Methodologies",
        status: "revoked",
        reason: "Certificate replaced by a newer version"
    }

};


verifyButton.addEventListener("click", verifyCertificate);

certificateIdInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        verifyCertificate();
    }
});


function verifyCertificate() {

    const certificateId = certificateIdInput.value.trim();
    const certificate = certificates[certificateId];

    result.classList.remove("hidden");
    reasonRow.classList.add("hidden");

    status.className = "";
    statusBadge.className = "status-badge";


    if (!certificate) {

        status.innerText = "Certificate Not Found";
        status.classList.add("not-found-text");

        statusBadge.innerText = "NOT FOUND";
        statusBadge.classList.add("not-found-badge");

        studentName.innerText = "-";
        courseName.innerText = "-";

        return;
    }


    studentName.innerText = certificate.student;
    courseName.innerText = certificate.course;


    if (certificate.status === "valid") {

        status.innerText = "Valid Certificate";
        status.classList.add("valid-text");

        statusBadge.innerText = "VALID";
        statusBadge.classList.add("valid-badge");

    }


    if (certificate.status === "revoked") {

        status.innerText = "Revoked Certificate";
        status.classList.add("revoked-text");

        statusBadge.innerText = "REVOKED";
        statusBadge.classList.add("revoked-badge");

        reason.innerText = certificate.reason;
        reasonRow.classList.remove("hidden");
    }
}