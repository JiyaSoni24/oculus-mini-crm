
// Load saved leads from browser storage
let leads = JSON.parse(localStorage.getItem("leadflow_leads")) || [];

// Save leads to browser storage
function saveLeads() {
    localStorage.setItem("leadflow_leads", JSON.stringify(leads));
}

// Show notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2500);
}

// Open add lead popup
function openModal() {
    document.getElementById("leadForm").reset();
    document.getElementById("leadId").value = "";
    document.getElementById("modalTitle").textContent = "Add New Lead";
    document.getElementById("leadModal").style.display = "flex";
}

// Close popup
function closeModal() {
    document.getElementById("leadModal").style.display = "none";
}

// Add or update a lead
document.getElementById("leadForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("leadId").value;

    const lead = {
        id: id ? Number(id) : Date.now(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        businessName: document.getElementById("businessName").value.trim(),
        status: document.getElementById("status").value
    };

    if (!lead.name || !lead.email || !lead.phone || !lead.businessName) {
        showToast("Please fill in all fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(lead.email)) {
        showToast("Please enter a valid email.");
        return;
    }

    if (id) {
        const index = leads.findIndex(item => item.id === Number(id));
        if (index !== -1) {
            leads[index] = lead;
        }
        showToast("Lead updated successfully!");
    } else {
        leads.push(lead);
        showToast("New lead added successfully!");
    }

    saveLeads();
    renderLeads();
    closeModal();
});

// Edit a lead
function editLead(id) {
    const lead = leads.find(item => item.id === id);

    if (!lead) return;

    document.getElementById("leadId").value = lead.id;
    document.getElementById("name").value = lead.name;
    document.getElementById("email").value = lead.email;
    document.getElementById("phone").value = lead.phone;
    document.getElementById("businessName").value = lead.businessName;
    document.getElementById("status").value = lead.status;

    document.getElementById("modalTitle").textContent = "Edit Lead";
    document.getElementById("leadModal").style.display = "flex";
}

// Delete a lead
function deleteLead(id) {
    const confirmDelete = confirm("Are you sure you want to delete this lead?");

    if (!confirmDelete) return;

    leads = leads.filter(lead => lead.id !== id);

    saveLeads();
    renderLeads();
    showToast("Lead deleted successfully!");
}

// Update dashboard statistics
function updateStats() {
    document.getElementById("totalLeads").textContent = leads.length;

    document.getElementById("newLeads").textContent =
        leads.filter(lead => lead.status === "New").length;

    document.getElementById("convertedLeads").textContent =
        leads.filter(lead => lead.status === "Converted").length;
}

// Display leads in table
function renderLeads() {
    const table = document.getElementById("leadsTable");
    const emptyState = document.getElementById("emptyState");

    const search = document.getElementById("searchInput").value.toLowerCase();
    const filter = document.getElementById("statusFilter").value;

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(search) ||
            lead.email.toLowerCase().includes(search);

        const matchesStatus =
            filter === "All" || lead.status === filter;

        return matchesSearch && matchesStatus;
    });

    table.innerHTML = "";

    if (filteredLeads.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    filteredLeads.forEach(lead => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = lead.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = lead.email;

        const phoneCell = document.createElement("td");
        phoneCell.textContent = lead.phone;

        const businessCell = document.createElement("td");
        businessCell.textContent = lead.businessName;

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = `status-badge status-${lead.status}`;
        badge.textContent = lead.status;
        statusCell.appendChild(badge);

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.className = "action-btn edit-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editLead(lead.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "action-btn delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteLead(lead.id));

        actionsCell.append(editButton, deleteButton);

        row.append(
            nameCell,
            emailCell,
            phoneCell,
            businessCell,
            statusCell,
            actionsCell
        );

        table.appendChild(row);
    });

    updateStats();
}

// Search leads
document.getElementById("searchInput").addEventListener("input", renderLeads);

// Filter leads by status
document.getElementById("statusFilter").addEventListener("change", renderLeads);

// Initial dashboard load
renderLeads();

